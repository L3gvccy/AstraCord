import type { ChannelType, GuildType, RoleType } from "@astracord/shared";

export type DashboardOutletContext = {
  guildInfo: GuildType | undefined;
  channels: [ChannelType] | undefined;
  roles: [RoleType] | undefined;
};
