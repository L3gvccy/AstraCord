import { Controller } from '@nestjs/common';
import { ServerStatsService } from './server-stats.service';

@Controller('server-stats')
export class ServerStatsController {
  constructor(private readonly serverStatsService: ServerStatsService) {}
}
