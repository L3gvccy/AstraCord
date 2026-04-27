import { Module } from "@nestjs/common";
import { GatewayIntentBits, IntentsBitField } from "discord.js";
import { NecordModule } from "necord";
import "dotenv/config";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { HelpModule } from "./help/help.module";
import { JtcModule } from './jtc/jtc.module';
import { WelcomeMessageModule } from './welcome-message/welcome-message.module';
import { ServerStatsModule } from './server-stats/server-stats.module';

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
    HelpModule,
    JtcModule,
    WelcomeMessageModule,
    ServerStatsModule,
  ],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
