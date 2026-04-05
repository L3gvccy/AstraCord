import { Module } from "@nestjs/common";
import { GatewayIntentBits, IntentsBitField } from "discord.js";
import { NecordModule } from "necord";
import "dotenv/config";
import { AppService } from "./app.service";
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    NecordModule.forRoot({
      token: process.env.DISCORD_BOT_TOKEN ?? "",
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.MessageContent,
      ],
    }),
  ],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
