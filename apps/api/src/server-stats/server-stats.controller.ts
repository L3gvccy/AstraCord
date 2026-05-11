import { CounterType } from "../../../../packages/database/dist/generated/prisma/enums";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ServerStatsService } from "./server-stats.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { serverStatsConfigDto } from "@astracord/shared";

@Controller("server-stats")
export class ServerStatsController {
  constructor(private readonly serverStatsService: ServerStatsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":guildId")
  async getOrCreateConfig(@Param("guildId") guildId: string) {
    return await this.serverStatsService.getOrCreateConfig(guildId);
  }
  @UseGuards(JwtAuthGuard)
  @Post("update-cfg")
  async updateConfig(@Body() dto: serverStatsConfigDto) {
    return await this.serverStatsService.updateConfig(dto);
  }
}
