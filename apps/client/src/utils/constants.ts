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
export const GET_GUILD_BY_ID_URL = (guildId: string) =>
  `${GUILDS_URL}/get-by-id/${guildId}`;

export const WELCOME_URL = `${API_URL}/welcome-message`;
export const GET_WELCOME_CONFIG_URL = (guildId: string) =>
  `${WELCOME_URL}/get-config/${guildId}`;
export const UPDATE_WELCOME_CONFIG_URL = `${WELCOME_URL}/update-config`;

export const JTC_URL = `${API_URL}/jtc`;
export const GET_JTC_CONFIG_URL = (guildId: string) => `${JTC_URL}/${guildId}`;
export const UPDATE_JTC_CONFIG_URL = `${JTC_URL}/update-cfg`;
