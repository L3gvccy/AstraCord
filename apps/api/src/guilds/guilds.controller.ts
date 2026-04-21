import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { GuildsService } from "./guilds.service";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@Controller("guilds")
export class GuildsController {
  constructor(private readonly guildsService: GuildsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserGuilds(@CurrentUser() currentUser: { userId: string }) {
    return await this.guildsService.getUserGuilds(currentUser.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("get-by-id/:guildId")
  async getGuildById(@Param("guildId") guildId: string) {
    return await this.guildsService.getGuildById(guildId);
  }
}
