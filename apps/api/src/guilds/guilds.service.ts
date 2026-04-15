import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import axios from "axios";
import { DISCORD_API_BASE_URL } from "../utils/constants";
import { DISCORD_PERMISSIONS } from "../utils/utils";

@Injectable()
export class GuildsService {
  constructor(private authService: AuthService) {}

  async getUserGuilds(userId: string) {
    const accessToken =
      await this.authService.getValidDiscordAccessToken(userId);

    try {
      const { data } = await axios.get(
        `${DISCORD_API_BASE_URL}/users/@me/guilds`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const guilds = await Promise.all(
        data.map(async (guild: any) => {
          let isBotConnected = false;

          try {
            await axios.get(
              `${DISCORD_API_BASE_URL}/guilds/${guild.id}/members/${process.env.DISCORD_CLIENT_ID}`,
              {
                headers: {
                  Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                },
              },
            );

            isBotConnected = true;
          } catch (error: any) {
            if (error.response?.status === 404) {
              isBotConnected = false;
            } else {
              throw error;
            }
          }

          const isOwner = guild.owner === true;
          const isAdministrator =
            (BigInt(guild.permissions) & DISCORD_PERMISSIONS.ADMINISTRATOR) ===
            DISCORD_PERMISSIONS.ADMINISTRATOR;

          const role = isOwner
            ? "Owner"
            : isAdministrator
              ? "Administrator"
              : "Member";

          return {
            id: guild.id,
            name: guild.name,
            icon: guild.icon,
            permissions: guild.permissions,
            isBotConnected,
            role,
          };
        }),
      );

      return guilds;
    } catch (error: any) {
      throw new UnauthorizedException(
        `Failed to fetch guilds: ${
          error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message
        }`,
      );
    }
  }
}
