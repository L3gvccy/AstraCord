import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";
import { ContextOf } from "necord";

@Injectable()
export class WelcomeMessageService {
  constructor(private prisma: PrismaService) {}

  async sendWelcomeMessage(ctx: ContextOf<"guildMemberAdd">[0]) {}
}
