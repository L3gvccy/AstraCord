export type counterType =
  | "TOTAL_USERS"
  | "USERS_ACTIVE"
  | "USERS_VOICE"
  | "BOTS"
  | "HUMANS";

export type serverStatsConfig = {
  id: string;
  guildId: string;
  isEnabled: boolean;

  counters: serverStatsCounter[];
};

export type serverStatsCounter = {
  id: string;
  guildId: string;
  channelId?: string | null;
  text?: string | null;
  type?: counterType | null;
};
