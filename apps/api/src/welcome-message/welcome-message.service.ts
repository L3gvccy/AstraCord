import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WelcomeMessageService {
  constructor(private prisma: PrismaService) {}

  async getWelcomeConfig(guildId: string) {
    const config = await this.prisma.welcomeMessageCfg.findUnique({
      where: { guildId },
    });
    if (config) {
      return config;
    } else {
      const newConfig = await this.prisma.welcomeMessageCfg.create({
        data: { guildId },
      });
      return newConfig;
    }
  }
}
