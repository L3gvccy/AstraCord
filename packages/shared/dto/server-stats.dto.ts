import type { serverStatsCounter } from "../types/server-stats";

export interface serverStatsConfigDto {
  id: string;
  guildId: string;
  isEnabled: boolean;

  counters: serverStatsCounter[];
}
