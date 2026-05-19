import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";
import { Client, Guild, VoiceState } from "discord.js";
import { CounterType } from "../../../../packages/database/dist/generated/prisma/enums";

@Injectable()
export class ServerStatsService {
  constructor(
    private prisma: PrismaService,
    private client: Client,
  ) {}
  async updateChannels() {
    const allConfigs = await this.prisma.serverStatsConfig.findMany({
      include: { counters: true },
    });
    for (const config of allConfigs) {
      if (!config.isEnabled) continue;

      const guild = await this.client.guilds
        .fetch(config.guildId)
        .catch(() => null);
      if (!guild) continue;

      await guild.members.fetch().catch((error) => {
        console.error(
          `Failed to fetch members for guild ${config.guildId}:`,
          error,
        );
      });

      for (const counter of config.counters) {
        if (!counter.channelId || !counter.type || !counter.text) continue;
        const channel = await guild.channels.cache.get(counter.channelId);
        if (!channel) continue;
        const counterValue = await this.getCounterValue(guild, counter.type);
        const channelName = this.generateChannelName(
          counter.text,
          counterValue,
        );
        await channel.setName(channelName).catch((error) => {
          console.error(
            `Failed to rename channel ${counter.channelId}:`,
            error,
          );
        });
      }
    }
  }
  async getCounterValue(guild: Guild, type: CounterType): Promise<number> {
    if (type === "TOTAL_USERS") {
      return guild.memberCount;
    }

    if (type === "BOTS") {
      return guild.members.cache.filter((member) => member.user.bot).size;
    }

    if (type === "HUMANS") {
      return guild.members.cache.filter((member) => !member.user.bot).size;
    }

    if (type === "USERS_ACTIVE") {
      return guild.presences.cache.filter((presence) =>
        ["online", "idle", "dnd"].includes(presence.status),
      ).size;
    }

    if (type === "USERS_VOICE") {
      return guild.voiceStates.cache.filter((voiceState) => {
        const member = voiceState.member;
        return member && !member.user.bot;
      }).size;
    }

    return 0;
  }

  generateChannelName(text: string, value: number) {
    const channelName = text.replaceAll("{count}", value.toString());
    return channelName;
  }
}
