import type { counterType } from "@astracord/shared";

export const COUNTER_TYPES: counterType[] = [
  "TOTAL_USERS",
  "USERS_ACTIVE",
  "USERS_VOICE",
  "BOTS",
  "HUMANS",
];

export const getRoleColor = (colorStr: string) => {
  const color = Number(colorStr);
  if (!color || color === 0) return "#ffffff";

  return `#${color.toString(16).padStart(6, "0")}`;
};
