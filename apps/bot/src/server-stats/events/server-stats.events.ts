import { Injectable } from "@nestjs/common";
import { ServerStatsService } from "../server-stats.service";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class ServerStatsEvents {
  constructor(private serverStatsService: ServerStatsService) {}
  @Cron("0 */5 * * * *")
  async handleUpdates() {
    await this.serverStatsService.updateChannels();
    console.log("Channels updated");
  }
}
