import { Module } from "@nestjs/common";
import { ServerStatsService } from "./server-stats.service";
import { ServerStatsController } from "./server-stats.controller";
import { PrismaModule } from "@astracord/database";

@Module({
  imports: [PrismaModule],
  controllers: [ServerStatsController],
  providers: [ServerStatsService],
})
export class ServerStatsModule {}
