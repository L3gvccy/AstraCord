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

      const guild = await this.client.guilds.cache.get(config.guildId);
      if (!guild) continue;
      for (const counter of config.counters) {
        if (!counter.channelId || !counter.type || !counter.text) continue;
        const channel = await guild.channels.cache.get(counter.channelId);
        if (!channel) continue;
        const counterValue = await this.getCounterValue(guild, counter.type);
        const channelName = this.generateChannelName(
          counter.text,
          counterValue,
        );
        await channel.setName(channelName).catch();
      }
    }
  }
  async getCounterValue(guild: Guild, type: CounterType) {
    let value = 0;

    if (type === "TOTAL_USERS") {
      value = guild.memberCount;
    } else if (type === "BOTS") {
      value = guild.members.cache.filter((member) => member.user.bot).size;
    } else if (type === "HUMANS") {
      value = guild.members.cache.filter((member) => !member.user.bot).size;
    } else if (type === "USERS_ACTIVE") {
      value = guild.members.cache.filter(
        (member) => member.presence && member.presence.status !== "offline",
      ).size;
    } else if (type === "USERS_VOICE") {
      value = guild.voiceStates.cache.filter((voiceState) => {
        const member = voiceState.member;
        return member && !member.user.bot;
      }).size;
    }

    return value;
  }
  generateChannelName(text: string, value: number) {
    const channelName = text.replaceAll("{count}", value.toString());
    return channelName;
  }
}
