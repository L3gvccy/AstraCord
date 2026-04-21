import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import axios from "axios";
import { DISCORD_API_BASE_URL } from "../utils/constants";
import { DISCORD_PERMISSIONS } from "../utils/utils";
import { GuildType } from "@astracord/shared";

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
          } catch {
            isBotConnected = false;
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

      const filteredGuilds = guilds.filter((guild) => guild.role !== "Member");
      return filteredGuilds;
    } catch (error: any) {
      console.log(error);
      throw new UnauthorizedException(
        `Failed to fetch guilds: ${
          error.response?.data
            ? JSON.stringify(error.response.data)
            : error.message
        }`,
      );
    }
  }

  async getGuildChannels(id: string) {
    try {
      const { data } = await axios.get(
        `${DISCORD_API_BASE_URL}/guilds/${id}/channels`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );

      return data;
    } catch (error) {
      return undefined;
    }
  }

  async getGuildById(id: string) {
    try {
      const { data: guildData } = await axios.get(
        `${DISCORD_API_BASE_URL}/guilds/${id}`,
        {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          },
        },
      );

      const guild: GuildType = {
        id: guildData.id,
        name: guildData.name,
        icon: guildData?.icon,
      };

      const channels = await this.getGuildChannels(id);

      return { guild, channels };
    } catch (error) {}
  }
}
