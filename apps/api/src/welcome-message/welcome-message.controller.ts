import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { WelcomeMessageService } from "./welcome-message.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UpdateWelcomeCfgDto } from "@astracord/shared";

@Controller("welcome-message")
export class WelcomeMessageController {
  constructor(private readonly welcomeMessageService: WelcomeMessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get("get-config/:guildId")
  async getWelcomeConfig(@Param("guildId") guildId: string) {
    return await this.welcomeMessageService.getWelcomeConfig(guildId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("update-config")
  async updateWelcomeConfig(@Body() dto: UpdateWelcomeCfgDto) {
    return await this.welcomeMessageService.updateWelcomeConfig(dto);
  }
}
