import { Injectable } from "@nestjs/common";
import { TicketsService } from "../tickets.service";
import { Context, SlashCommand, SlashCommandContext } from "necord";

@Injectable()
export class TicketsCommands {
  constructor(private ticketsService: TicketsService) {}

  @SlashCommand({
    name: "set-tickets",
    description: "Send tickets embed message",
  })
  async onSetTickets(@Context() interaction: SlashCommandContext[0]) {}
}
