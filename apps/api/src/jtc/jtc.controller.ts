import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JtcService } from "./jtc.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { jtcConfigDto } from "@astracord/shared";

@Controller("jtc")
export class JtcController {
  constructor(private readonly jtcService: JtcService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":guildId")
  async getOrCreateConfig(@Param("guildId") guildId: string) {
    return await this.jtcService.getOrCreateConfig(guildId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("update-cfg")
  async updateConfig(@Body() dto: jtcConfigDto) {
    return await this.jtcService.updateConfig(dto);
  }
}
