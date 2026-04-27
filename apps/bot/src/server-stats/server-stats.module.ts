import { Module } from '@nestjs/common';
import { ServerStatsService } from './server-stats.service';

@Module({
  providers: [ServerStatsService]
})
export class ServerStatsModule {}
