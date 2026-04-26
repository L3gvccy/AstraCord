import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";
import { ColorResolvable, EmbedBuilder } from "discord.js";
import { ContextOf } from "necord";

@Injectable()
export class WelcomeMessageService {
  constructor(private prisma: PrismaService) {}

  async sendWelcomeMessage(ctx: ContextOf<"guildMemberAdd">[0]) {
    const guild = ctx.guild;
    const user = ctx.user;

    const cfg = await this.prisma.welcomeMessageCfg.findUnique({
      where: { guildId: guild.id },
    });

    if (!cfg || !cfg.channelId) return;

    if (!cfg.isEnabled) return;

    const channel = guild.channels.cache.get(cfg?.channelId);
    if (!channel) return;
    if (!channel.isTextBased()) return;

    const message = cfg.message.replaceAll("{user}", `<@${user.id}>`);

    if (cfg.isEmbed) {
      const embed = new EmbedBuilder()
        .setColor(cfg.color as ColorResolvable)
        .setDescription(message)
        .setTimestamp();

      if (cfg.title) {
        embed.setTitle(cfg.title);
      }

      if (cfg.displayAvatar) {
        const thumbUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        embed.setThumbnail(thumbUrl);
      }

      if (cfg.imageUrl) {
        embed.setImage(cfg.imageUrl);
      }

      channel.send({ embeds: [embed] });
    } else {
      channel.send({ content: message });
    }
  }
}
