export interface UpdateWelcomeCfgDto {
  guildId: string;
  isEnabled: boolean;
  channelId: string;
  isEmbed: boolean;
  message: string;
  title?: string;
  color?: string;
  displayAvatar: boolean;
  imageUrl?: string;
}
