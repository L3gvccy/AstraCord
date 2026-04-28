export type jtcConfig = {
  id: string;
  guildId: string;
  isEnabled: boolean;

  channels: jtcChannel[];
};

export type jtcChannel = {
  id: string;
  guildId: string;
  channelId?: string;
  categoryId?: string;
  channelName: string;
  userLimit: number;
};
