import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";
import {
  TicketConfig,
  TicketOption,
} from "../../../../packages/database/dist/generated/prisma/client";
import {
  ActionRowBuilder,
  ChannelType,
  ChatInputCommandInteraction,
  Client,
  ColorResolvable,
  EmbedBuilder,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from "discord.js";

@Injectable()
export class TicketsService {
  constructor(
    private prisma: PrismaService,
    private client: Client,
  ) {}

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
      .setColor(config.color as ColorResolvable)
      .setTimestamp();

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

  async createTicket(
    interaction: StringSelectMenuInteraction,
    optionId: string,
  ) {
    const ticketPermissions = [
      PermissionFlagsBits.ViewChannel,
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.ReadMessageHistory,
      PermissionFlagsBits.AttachFiles,
      PermissionFlagsBits.EmbedLinks,
    ];
    await interaction.deferReply({ ephemeral: true });

    const userId = interaction.user.id;

    const ticketOption = await this.prisma.ticketOption.findUnique({
      where: { id: optionId },
      include: { roles: true },
    });

    if (!ticketOption) {
      await interaction.editReply({
        content: "This option does not exist anymore!",
      });
      return;
    }

    const config = await this.prisma.ticketConfig.findUnique({
      where: { id: ticketOption.ticketConfigId },
    });

    if (!config?.isEnabled) {
      await interaction.editReply({
        content: "Tickets are now disabled on this server",
      });
      return;
    }

    const guild = await this.client.guilds.fetch(config.guildId);

    const channel = await guild.channels.create({
      name: this.generateTicketChannelName(userId, ticketOption.optionEmoji),
      type: ChannelType.GuildText,
      parent: config.categoryId,
      permissionOverwrites: [
        { id: guild.id, deny: ["ViewChannel"] },
        {
          id: userId,
          allow: ticketPermissions,
        },
        ...ticketOption.roles.map((role) => ({
          id: role.roleId,
          allow: ticketPermissions,
        })),
      ],
    });

    if (ticketOption.isEmbed) {
      const inTicketEmbed = this.buildInTicketEmbed(ticketOption);
      await channel.send({ embeds: [inTicketEmbed] });
    } else {
      await channel.send({ content: ticketOption.message });
    }

    await interaction.editReply({
      content: `Ticket <#${channel.id}> created!`,
    });
  }

  generateTicketChannelName(userId: string, emoji?: string) {
    return `${emoji ? emoji : "🎟️"}│ticket-${userId}`;
  }

  buildInTicketEmbed(option: TicketOption) {
    const embed = new EmbedBuilder()
      .setDescription(option.message)
      .setColor(option.color as ColorResolvable)
      .setTimestamp();

    if (option.title) {
      embed.setTitle(option.title);
    }

    if (option.thumbnailImageUrl) {
      embed.setThumbnail(option.thumbnailImageUrl);
    }
    if (option.imageUrl) {
      embed.setImage(option.imageUrl);
    }

    return embed;
  }
}
