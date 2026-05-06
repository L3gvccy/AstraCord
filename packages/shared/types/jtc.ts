export type jtcConfig = {
  id: string;
  guildId: string;
  isEnabled: boolean;

  channels: jtcChannel[];
};

export type jtcChannel = {
  id?: string;
  guildId: string;
  channelId?: string | null;
  categoryId?: string | null;
  channelName: string;
  userLimit: number;
};
