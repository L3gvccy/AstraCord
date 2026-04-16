export const AUTHORIZE_BOT_TO_SERVER = (guildId: string) =>
  `https://discord.com/oauth2/authorize?client_id=1490054958366593095&permissions=8&integration_type=0&scope=bot&guild_id=${guildId}&disable_guild_select=true`;
export const AUTHORIZE_BOT = `https://discord.com/oauth2/authorize?client_id=1490054958366593095&permissions=8&integration_type=0&scope=bot`;

export const HOST = import.meta.env.VITE_SERVER_URL;

export const API_URL = `${HOST}/api`;

export const AUTH_URL = `${API_URL}/auth`;
export const DISCORD_AUTH_URL = `${AUTH_URL}/discord`;
export const GET_ME_URL = `${AUTH_URL}/me`;

export const GUILDS_URL = `${API_URL}/guilds`;
export const GET_USER_GUILDS_URL = `${GUILDS_URL}`;
