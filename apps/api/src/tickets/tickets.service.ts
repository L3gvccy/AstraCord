import { PrismaService } from "@astracord/database";
import {
  TicketConfig,
  TicketConfigDto,
  TicketOption,
  TicketOptionRole,
} from "@astracord/shared";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateConfig(guildId: string) {
    const existingConfig = await this.prisma.ticketConfig.findUnique({
      where: { guildId },
      include: {
        options: { include: { roles: true }, orderBy: { position: "asc" } },
      },
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

  async updateConfig(dto: TicketConfigDto) {
    const existingConfig = await this.prisma.ticketConfig.findUnique({
      where: { guildId: dto.guildId },
      include: {
        options: { include: { roles: true }, orderBy: { position: "asc" } },
      },
    });

    if (!existingConfig) {
      throw new NotFoundException("Config not found");
    }

    if (!dto.title || !dto.description || !dto.categoryId) {
      throw new BadRequestException("Please fill all necessary fields");
    }

    for (const option of existingConfig.options) {
      const existsInDto = dto?.options?.find(
        (dtoCounter) => option.id === dtoCounter.id,
      );
      if (!existsInDto) {
        await this.deleteOption(option.id);
      }
    }

    for (const option of dto?.options) {
      await this.updateOrCreateOption(existingConfig, option);
    }

    const updatedCfg = await this.prisma.ticketConfig.update({
      where: { guildId: dto.guildId },
      data: {
        categoryId: dto.categoryId,
        isEnabled: dto.isEnabled,
        title: dto.title,
        description: dto.description,
        color: dto.color,
        thumbnailImageUrl: dto.thumbnailImageUrl,
        imageUrl: dto.imageUrl,
      },
      include: {
        options: { include: { roles: true }, orderBy: { position: "asc" } },
      },
    });

    return updatedCfg;
  }

  async deleteOption(id: string) {
    await this.prisma.ticketOption.delete({ where: { id } });
  }

  async updateOrCreateOption(
    config: Pick<TicketConfig, "id" | "guildId">,
    option: TicketOption,
  ) {
    if (
      !option.optionEmoji ||
      !option.optionText ||
      !option.message ||
      !option.color
    ) {
      console.log(option);
      throw new BadRequestException("Please fill all fields");
    }

    let optionInDb;

    if (!option.id) {
      optionInDb = await this.prisma.ticketOption.create({
        data: {
          ticketConfigId: config.id,
          guildId: config.guildId,
          position: option.position,
          optionEmoji: option.optionEmoji,
          optionText: option.optionText,
          optionDescription: option.optionDescription,
          isEmbed: option.isEmbed,
          title: option.title,
          message: option.message,
          imageUrl: option?.imageUrl,
          thumbnailImageUrl: option?.thumbnailImageUrl,
        },
        include: { roles: true },
      });
    } else {
      optionInDb = await this.prisma.ticketOption.update({
        where: { id: option.id },
        data: {
          position: option.position,
          optionEmoji: option.optionEmoji,
          optionText: option.optionText,
          optionDescription: option.optionDescription,
          isEmbed: option.isEmbed,
          title: option.title,
          message: option.message,
          color: option.color,
          imageUrl: option?.imageUrl,
          thumbnailImageUrl: option?.thumbnailImageUrl,
        },
        include: { roles: true },
      });
    }

    for (const role of optionInDb.roles) {
      const roleExistsInDto = option.roles.find(
        (dtoRole) => dtoRole.id === role.id,
      );
      if (!roleExistsInDto) {
        await this.deleteOptionRole(role.id);
      }
    }

    for (const role of option.roles) {
      const existsInConfig = optionInDb.roles.find(
        (roleInDb) => roleInDb.roleId === role.roleId,
      );
      if (!existsInConfig) {
        await this.createOptionRole(role);
      }
    }
  }

  async deleteOptionRole(id: string) {
    await this.prisma.ticketOptionRole.delete({ where: { id } });
  }

  async createOptionRole(role: TicketOptionRole) {
    const existingOptionRole = await this.prisma.ticketOptionRole.findUnique({
      where: {
        ticketOptionId_roleId: {
          ticketOptionId: role.ticketOptionId,
          roleId: role.roleId,
        },
      },
    });
    if (existingOptionRole) {
      throw new BadRequestException("Cannot add two same roles to one option");
    }

    if (!role.id && !existingOptionRole) {
      await this.prisma.ticketOptionRole.create({
        data: {
          ticketOptionId: role.ticketOptionId,
          roleId: role.roleId,
        },
      });
    }
  }
}
