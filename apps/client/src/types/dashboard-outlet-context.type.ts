import type { ChannelType, GuildType, RoleType } from "@astracord/shared";
import type React from "react";

export type DashboardOutletContext = {
  mainRef: React.RefObject<HTMLElement | null>;
  guildInfo: GuildType | undefined;
  channels: [ChannelType] | undefined;
  roles: [RoleType] | undefined;
};
