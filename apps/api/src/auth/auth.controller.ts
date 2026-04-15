import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Response, Request } from "express";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("discord")
  discordLogin(@Res() res: Response) {
    return res.redirect(this.authService.getDiscordAuthUrl());
  }

  @Get("auth-success")
  async authSuccess(@Query("code") code: string, @Res() res: Response) {
    if (!code) {
      throw new BadRequestException("Discord code is required");
    }

    const { jwt } = await this.authService.loginWithDiscord(code);

    return res.redirect(
      `${process.env.ORIGIN}/auth/callback?token=${encodeURIComponent(jwt)}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@CurrentUser() currentUser: { userId: string }) {
    return this.authService.validateJwtUser(currentUser.userId);
  }
}
