import { Injectable } from "@nestjs/common";
import { EmbedBuilder } from "discord.js";

@Injectable()
export class HelpService {
  public createHelpEmbed(): EmbedBuilder {
    return new EmbedBuilder()
      .setColor("#7C3AED")
      .setTitle("📚 AstraCord Commands")
      .setDescription("Here is the list of available commands.")
      .addFields(
        {
          name: "⚒ Moderation",
          value: "`/ban`, `/mute`, `/warn`",
          inline: false,
        },
        {
          name: "🎫 Tickets",
          value: "`/ticket`, `/close`",
          inline: false,
        },
        {
          name: "📈 Levels",
          value: "`/rank`, `/leaderboard`",
          inline: false,
        },
      )
      .setFooter({
        text: "AstraCord • All-in-one Discord bot",
      });
  }
}
