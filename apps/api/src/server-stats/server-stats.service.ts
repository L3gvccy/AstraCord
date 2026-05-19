import { CounterType } from "../../../../packages/database/dist/generated/prisma/enums";
import { PrismaService } from "@astracord/database";
import {
  serverStatsConfigDto,
  type serverStatsCounter,
} from "@astracord/shared";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class ServerStatsService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateConfig(guildId: string) {
    const existingConfig = await this.prisma.serverStatsConfig.findUnique({
      where: { guildId },
      include: { counters: true },
    });

    if (existingConfig) return existingConfig;
    const config = await this.prisma.serverStatsConfig.create({
      data: { guildId },
    });
    return config;
  }

  async updateConfig(dto: serverStatsConfigDto) {
    const existingConfig = await this.prisma.serverStatsConfig.findUnique({
      where: { guildId: dto.guildId },
      include: { counters: true },
    });

    if (!existingConfig) {
      throw new NotFoundException("Config not found");
    }

    for (const counter of existingConfig.counters) {
      const existsInDto = dto.counters.find(
        (dtoCounter) => counter.id === dtoCounter.id,
      );
      if (!existsInDto) {
        await this.deleteCounter(counter.id);
      }
    }
    for (const counter of dto.counters) {
      await this.updateOrCreateCounter(existingConfig.guildId, counter);
    }
    const updatedConfig = await this.prisma.serverStatsConfig.update({
      where: { guildId: dto.guildId },
      data: { isEnabled: dto.isEnabled },
      include: { counters: true },
    });

    return updatedConfig;
  }

  async deleteCounter(id: string) {
    await this.prisma.serverStatsCounter.delete({
      where: { id },
    });
  }

  async updateOrCreateCounter(guildId: string, counter: serverStatsCounter) {
    if (!counter.channelId || !counter.type || !counter.text?.trim()) {
      throw new BadRequestException("Please fill all fields");
    }

    if (counter.id) {
      return this.prisma.serverStatsCounter.update({
        where: { id: counter.id },
        data: {
          channelId: counter.channelId,
          type: counter.type,
          text: counter.text,
        },
      });
    }

    return this.prisma.serverStatsCounter.create({
      data: {
        guildId,
        channelId: counter.channelId,
        type: counter.type,
        text: counter.text,
      },
    });
  }
}
