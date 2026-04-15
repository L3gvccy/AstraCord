export const HOST = import.meta.env.VITE_SERVER_URL;

export const API_URL = `${HOST}/api`;

export const AUTH_URL = `${API_URL}/auth`;
export const DISCORD_AUTH_URL = `${AUTH_URL}/discord`;
export const GET_ME_URL = `${AUTH_URL}/me`;

export const GUILDS_URL = `${API_URL}/guilds`;
export const GET_USER_GUILDS_URL = `${GUILDS_URL}`;
