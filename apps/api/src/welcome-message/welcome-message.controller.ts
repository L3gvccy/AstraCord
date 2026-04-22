import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { WelcomeMessageService } from "./welcome-message.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Controller("welcome-message")
export class WelcomeMessageController {
  constructor(private readonly welcomeMessageService: WelcomeMessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get("get-config/:guildId")
  async getWelcomeConfig(@Param("guildId") guildId: string) {
    return await this.welcomeMessageService.getWelcomeConfig(guildId);
  }
}
