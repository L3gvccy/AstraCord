import { Module } from "@nestjs/common";
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { GuildsModule } from './guilds/guilds.module';
import { WelcomeMessageModule } from './welcome-message/welcome-message.module';

@Module({
  imports: [AuthModule, GuildsModule, WelcomeMessageModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
