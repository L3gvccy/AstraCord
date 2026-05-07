import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";
import {
  ChannelType,
  PermissionFlagsBits,
  PermissionsBitField,
  VoiceState,
} from "discord.js";

@Injectable()
export class JtcService {
  constructor(private prisma: PrismaService) {}

  async handleJtcEvent(oldState: VoiceState, newState: VoiceState) {
    const config = await this.prisma.jtcConfig.findUnique({
      where: { guildId: oldState.guild.id },
      include: { channels: true },
    });

    if (!config || !config.isEnabled) return;

    // Create temporary channel
    if (!oldState.channelId && newState.channelId) {
      const cfgChannel = config.channels.find(
        (channel) => channel.channelId === newState.channelId,
      );
      if (!cfgChannel) return;

      const { member, guild } = newState;
      if (!member) return;

      const channelName = cfgChannel.channelName.replaceAll(
        "{username}",
        `${member?.user.displayName}`,
      );
      const newChannel = await guild.channels.create({
        name: channelName,
        type: ChannelType.GuildVoice,
        parent: cfgChannel.categoryId,
        userLimit: cfgChannel.userLimit,
        permissionOverwrites: [
          {
            id: guild.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: member?.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.MoveMembers,
              PermissionsBitField.Flags.ManageChannels,
              PermissionsBitField.Flags.ManageRoles,
            ],
          },
        ],
      });

      await member?.voice.setChannel(newChannel);
    }

    // Delete temporary channel if no users left
    if (oldState.channelId && !newState.channelId) {
      const categoryInCfg = config.channels.find(
        (channel) => channel.categoryId === oldState.channel?.parentId,
      );
      if (!categoryInCfg) return;
      const isJtcChannel = config.channels.find(
        (channel) => channel.channelId === oldState.channelId,
      );
      if (isJtcChannel) return;

      if (oldState.channel?.members?.size === 0) {
        await oldState.channel.delete().catch(console.error);
      }
    }
  }
}
