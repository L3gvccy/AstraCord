import type { counterType } from "@astracord/shared";

export const COUNTER_TYPES: counterType[] = [
  "TOTAL_USERS",
  "USERS_ACTIVE",
  "USERS_VOICE",
  "BOTS",
  "HUMANS",
];

export const counterDisplayNames = {
  TOTAL_USERS: "Total users",
  USERS_ACTIVE: "Active users",
  USERS_VOICE: "Users in voice channels",
  BOTS: "Bot users",
  HUMANS: "Human users",
};

export const getRoleColor = (colorStr: string) => {
  const color = Number(colorStr);
  if (!color || color === 0) return "#ffffff";

  return `#${color.toString(16).padStart(6, "0")}`;
};
