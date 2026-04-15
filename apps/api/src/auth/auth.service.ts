import axios from "axios";
import { PrismaService } from "@astracord/database";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DiscordUser } from "@astracord/shared";
import { DISCORD_API_BASE_URL } from "../utils/constants";

type DiscordTokenResponse = {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  refresh_token?: string;
  scope: string;
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  getDiscordAuthUrl() {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID as string,
      response_type: "code",
      redirect_uri: new URL(
        process.env.DISCORD_REDIRECT_URI as string,
      ).toString(),
      scope: "identify connections guilds guilds.join email",
      prompt: "consent",
    });

    return `https://discord.com/oauth2/authorize?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<DiscordTokenResponse> {
    const body = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID as string,
      client_secret: process.env.DISCORD_CLIENT_SECRET as string,
      grant_type: "authorization_code",
      code,
      redirect_uri: new URL(
        process.env.DISCORD_REDIRECT_URI as string,
      ).toString(),
    });

    try {
      const { data } = await axios.post<DiscordTokenResponse>(
        `${DISCORD_API_BASE_URL}/oauth2/token`,
        body.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return data;
    } catch (error: any) {
      throw new UnauthorizedException(
        `Discord token exchange failed: ${
          error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message
        }`,
      );
    }
  }

  async refreshDiscordToken(
    refreshToken: string,
  ): Promise<DiscordTokenResponse> {
    const body = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID as string,
      client_secret: process.env.DISCORD_CLIENT_SECRET as string,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    try {
      const { data } = await axios.post<DiscordTokenResponse>(
        `${DISCORD_API_BASE_URL}/oauth2/token`,
        body.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return data;
    } catch (error: any) {
      throw new UnauthorizedException(
        `Discord token refresh failed: ${
          error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message
        }`,
      );
    }
  }

  async getDiscordUser(accessToken: string): Promise<DiscordUser> {
    try {
      const { data } = await axios.get<DiscordUser>(
        `${DISCORD_API_BASE_URL}/users/@me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return data;
    } catch (error: any) {
      throw new UnauthorizedException(
        `Failed to fetch Discord user: ${
          error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message
        }`,
      );
    }
  }

  buildAvatarUrl(user: DiscordUser) {
    if (!user.avatar) return null;
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
  }

  buildBannerUrl(user: DiscordUser) {
    if (!user.banner) return null;
    return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=512`;
  }

  async loginWithDiscord(code: string) {
    const tokenData = await this.exchangeCode(code);
    const discordUser = await this.getDiscordUser(tokenData.access_token);

    const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

    const user = await this.prisma.user.upsert({
      where: {
        id: discordUser.id,
      },
      update: {
        username: discordUser.username,
        globalName: discordUser.global_name ?? null,
        discriminator: discordUser.discriminator ?? null,
        avatar: this.buildAvatarUrl(discordUser),
        banner: this.buildBannerUrl(discordUser),
        email: discordUser.email ?? null,
        locale: discordUser.locale ?? null,
        verified: discordUser.verified ?? null,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token ?? null,
        expiresAt,
      },
      create: {
        id: discordUser.id,
        username: discordUser.username,
        globalName: discordUser.global_name ?? null,
        discriminator: discordUser.discriminator ?? null,
        avatar: this.buildAvatarUrl(discordUser),
        banner: this.buildBannerUrl(discordUser),
        email: discordUser.email ?? null,
        locale: discordUser.locale ?? null,
        verified: discordUser.verified ?? null,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token ?? null,
        expiresAt,
      },
    });

    const jwt = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });

    return {
      jwt,
      user,
    };
  }

  async validateJwtUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        globalName: true,
        avatar: true,
        banner: true,
        email: true,
        locale: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getValidDiscordAccessToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (user.accessToken && user.expiresAt && user.expiresAt > new Date()) {
      return user.accessToken;
    }

    if (!user.refreshToken) {
      throw new UnauthorizedException("No refresh token available");
    }

    const refreshed = await this.refreshDiscordToken(user.refreshToken);
    const expiresAt = new Date(Date.now() + refreshed.expires_in * 1000);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        accessToken: refreshed.access_token,
        refreshToken: refreshed.refresh_token ?? user.refreshToken,
        expiresAt,
      },
    });

    return refreshed.access_token;
  }
}
