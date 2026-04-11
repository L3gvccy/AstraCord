export type DiscordUser = {
  id: string;
  username: string;
  global_name: string | null;
  discriminator?: string;
  avatar: string | null;
  banner?: string | null;
  email?: string | null;
  locale?: string | null;
  verified?: boolean | null;
};
