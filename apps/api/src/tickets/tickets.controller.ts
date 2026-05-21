import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TicketsService } from "./tickets.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { TicketConfigDto } from "@astracord/shared";

@Controller("tickets")
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":guildId")
  async getConfig(@Param("guildId") guildId: string) {
    return await this.ticketsService.getOrCreateConfig(guildId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("update-cfg")
  async updateCfg(@Body() dto: TicketConfigDto) {
    return await this.ticketsService.updateConfig(dto);
  }
}
