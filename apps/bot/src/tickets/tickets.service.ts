import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";
import {
  TicketConfig,
  TicketOption,
} from "../../../../packages/database/dist/generated/prisma/client";
import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  ColorResolvable,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async sendTicketsEmbed(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const config = await this.prisma.ticketConfig.findUnique({
      where: { guildId: interaction.guild?.id },
      include: {
        options: { include: { roles: true }, orderBy: { position: "asc" } },
      },
    });

    if (!config) {
      await interaction.editReply({
        content: "Tickets config not found",
      });
      return;
    }

    if (!config.isEnabled) {
      await interaction.editReply({
        content: "Tickets config is not enabled",
      });
      return;
    }

    const channel = interaction.channel;
    if (!channel || !channel.isTextBased() || !channel.isSendable()) {
      await interaction.editReply({
        content: "Can't set up tickets in this channel",
      });
      return;
    }

    const embed = this.buildTicketPanelEmbed(config);
    const selectRow = this.buildTicketPanelSelect(config.options);

    await channel.send({
      embeds: [embed],
      components: [selectRow],
    });

    await interaction.editReply({ content: "Embed message has been sent!" });
  }

  buildTicketPanelEmbed(config: TicketConfig) {
    const embed = new EmbedBuilder()
      .setTitle(config.title)
      .setDescription(config.description)
      .setColor(config.color as ColorResolvable);

    if (config.thumbnailImageUrl) {
      embed.setThumbnail(config.thumbnailImageUrl);
    }
    if (config.imageUrl) {
      embed.setImage(config.imageUrl);
    }

    return embed;
  }

  buildTicketPanelSelect(options: TicketOption[]) {
    const safeOptions = options.slice(0, 25);

    const select = new StringSelectMenuBuilder()
      .setCustomId("CREATE_TICKET_SELECT")
      .setPlaceholder("Select an option to create ticket")
      .addOptions(
        safeOptions.map((option) => {
          const selectOption = new StringSelectMenuOptionBuilder()
            .setLabel(option.optionText.slice(0, 100))
            .setValue(option.id!);

          if (option.optionDescription) {
            selectOption.setDescription(option.optionDescription.slice(0, 100));
          }

          if (option.optionEmoji) {
            selectOption.setEmoji(option.optionEmoji);
          }

          return selectOption;
        }),
      );

    return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      select,
    );
  }
}
