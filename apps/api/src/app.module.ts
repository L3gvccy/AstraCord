import { Module } from "@nestjs/common";
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { GuildsModule } from './guilds/guilds.module';
import { WelcomeMessageModule } from './welcome-message/welcome-message.module';
import { ServerStatsModule } from './server-stats/server-stats.module';
import { JtcModule } from './jtc/jtc.module';
import { TicketsModule } from './tickets/tickets.module';
import { CountersModule } from './counters/counters.module';

@Module({
  imports: [AuthModule, GuildsModule, WelcomeMessageModule, ServerStatsModule, JtcModule, TicketsModule, CountersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
