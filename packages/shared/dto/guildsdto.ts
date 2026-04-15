export interface GuildResponseDto {
  id: string;
  name: string;
  icon?: string;
  permissions: string;
  isBotConnected: boolean;
  role: string;
}
