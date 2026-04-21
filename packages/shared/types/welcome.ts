export type WelcomeCfg = {
  id: string;
  guildId: string;
  isEnabled: Boolean;
  channelId: string;
  isEmbed: boolean;
  message: string;
  title?: string;
  color?: string;
  displayAvatar: boolean;
  imageUrl?: string;
};
