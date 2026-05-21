import { Injectable } from "@nestjs/common";
import { TicketsService } from "../tickets.service";
import { Context, SlashCommand, type SlashCommandContext } from "necord";
import { PermissionFlagsBits } from "discord.js";

@Injectable()
export class TicketsCommands {
  constructor(private ticketsService: TicketsService) {}

  @SlashCommand({
    name: "set-tickets-message",
    description: "Send tickets embed message",
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
  })
  async onSetTickets(@Context() [interaction]: SlashCommandContext) {
    return await this.ticketsService.sendTicketsEmbed(interaction);
  }
}
