import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Controller("tickets")
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":guildId")
  async getConfig(@Param("guildId") guildId: string) {
    return await this.ticketsService.getOrCreateConfig(guildId);
  }
}
