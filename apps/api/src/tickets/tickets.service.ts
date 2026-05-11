import { PrismaService } from "@astracord/database";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateConfig(guildId: string) {}
}
