import type { jtcChannel } from "../types/jtc";

export type jtcConfigDto = {
  id: string;
  guildId: string;
  isEnabled: boolean;

  channels: jtcChannel[];
};
