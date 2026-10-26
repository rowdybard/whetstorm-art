// Whether this server has Discord OAuth configured: a client id AND a client
// secret in the env. A leaf with no imports, so the public /api/status advert
// (server/leaderboard.ts, plus the legacy arm in server/main.ts) can read it
// without loading the Discord route module. discordConfig() in server/discord.ts
// gates on the same predicate, so the advert and the routes can never disagree.
export function discordOAuthConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return !!env.DISCORD_CLIENT_ID && !!env.DISCORD_CLIENT_SECRET;
}
