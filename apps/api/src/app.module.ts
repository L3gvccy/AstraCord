import { Module } from "@nestjs/common";
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { GuildsModule } from './guilds/guilds.module';

@Module({
  imports: [AuthModule, GuildsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
