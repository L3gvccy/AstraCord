import { PrismaService } from "@astracord/database";
import { UpdateWelcomeCfgDto } from "@astracord/shared";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

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

  async updateWelcomeConfig(dto: UpdateWelcomeCfgDto) {
    const existingCfg = await this.prisma.welcomeMessageCfg.findUnique({
      where: { guildId: dto.guildId },
    });

    if (!existingCfg)
      throw new NotFoundException("Welcome message config not found");

    if (!dto.message || !dto.channelId) {
      throw new BadRequestException("ChannelId and message are required");
    }

    const updatedCfg = await this.prisma.welcomeMessageCfg.update({
      where: { guildId: dto.guildId },
      data: {
        isEnabled: dto.isEnabled,
        channelId: dto.channelId,
        isEmbed: dto.isEmbed,
        message: dto.message,
        title: dto?.title,
        color: dto?.color,
        displayAvatar: dto.displayAvatar,
        imageUrl: dto?.imageUrl,
      },
    });

    return updatedCfg;
  }
}
