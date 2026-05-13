import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateConfig(guildId: string) {
    const existingConfig = await this.prisma.ticketConfig.findUnique({
      where: { guildId },
      include: { options: { include: { roles: true } } },
    });

    if (existingConfig) return existingConfig;

    const newConfig = await this.prisma.ticketConfig.create({
      data: {
        guildId,
        options: {
          create: [
            {
              guildId,
              position: 0,
              optionEmoji: "🎟️",
              optionText: "General ticket",
            },
          ],
        },
      },
    });

    return newConfig;
  }
}
