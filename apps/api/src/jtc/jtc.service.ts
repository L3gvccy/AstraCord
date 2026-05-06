import { PrismaService } from "@astracord/database";
import { jtcChannel, jtcConfigDto } from "@astracord/shared";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class JtcService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateConfig(guildId: string) {
    const existingConfig = await this.prisma.jtcConfig.findUnique({
      where: { guildId },
      include: { channels: true },
    });

    if (existingConfig) return existingConfig;

    const config = await this.prisma.jtcConfig.create({ data: { guildId } });
    return config;
  }

  async updateConfig(dto: jtcConfigDto) {
    const existingConfig = await this.prisma.jtcConfig.findUnique({
      where: { guildId: dto.guildId },
      include: { channels: true },
    });

    if (!existingConfig) {
      throw new NotFoundException("Config not found");
    }

    // Delete removed channels from database
    for (const cfgChannel of existingConfig.channels) {
      const existsInDto = dto.channels.some(
        (channel) => channel.id === cfgChannel.id,
      );

      if (!existsInDto) {
        await this.deleteChannel(cfgChannel.id);
      }
    }

    // Update or create channels
    for (const channel of dto.channels) {
      await this.updateOrCreateChannel(channel, dto.guildId);
    }

    const updatedConfig = await this.prisma.jtcConfig.update({
      where: { guildId: dto.guildId },
      data: { isEnabled: dto.isEnabled },
      include: { channels: true },
    });

    return updatedConfig;
  }

  async addChannel(guildId: string) {
    await this.prisma.jtcChannel.create({
      data: { guildId },
    });

    return await this.getOrCreateConfig(guildId);
  }

  async deleteChannel(id: string) {
    const deletedChannel = await this.prisma.jtcChannel.delete({
      where: { id },
    });

    return await this.getOrCreateConfig(deletedChannel.guildId);
  }

  async updateOrCreateChannel(channel: jtcChannel, guildId: string) {
    if (
      !channel.categoryId ||
      !channel.channelId ||
      !channel.channelName ||
      channel.userLimit === undefined ||
      channel.userLimit === null
    ) {
      throw new BadRequestException(`Please fill all fields`);
    }

    const existingChannel = channel.id
      ? await this.prisma.jtcChannel.findUnique({
          where: { id: channel.id },
        })
      : null;
    if (!existingChannel) {
      await this.prisma.jtcChannel.create({
        data: {
          guildId,
          channelId: channel.channelId,
          categoryId: channel.categoryId,
          channelName: channel.channelName,
          userLimit: channel.userLimit,
        },
      });
    } else {
      await this.prisma.jtcChannel.update({
        where: { id: channel.id },
        data: {
          channelId: channel.channelId,
          categoryId: channel.categoryId,
          channelName: channel.channelName,
          userLimit: channel.userLimit,
        },
      });
    }
  }
}
