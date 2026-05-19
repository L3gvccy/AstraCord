import { Module } from "@nestjs/common";
import { ServerStatsService } from "./server-stats.service";
import { ServerStatsEvents } from "./events/server-stats.events";
import { PrismaModule } from "@astracord/database";

@Module({
  imports: [PrismaModule],
  providers: [ServerStatsService, ServerStatsEvents],
})
export class ServerStatsModule {}
