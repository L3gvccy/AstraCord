import { Module } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { PrismaModule } from "@astracord/database";
import { TicketsCommands } from "./commands/tickets.commands";
import { TicketsEvents } from "./events/ticket.events";

@Module({
  imports: [PrismaModule],
  providers: [TicketsService, TicketsCommands, TicketsEvents],
})
export class TicketsModule {}
