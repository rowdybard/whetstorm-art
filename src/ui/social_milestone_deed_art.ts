// Original paintings for guild, market, and bank milestones.
const SOCIAL_MILESTONE_DEED_ART = new Map<string, string>([
  ['soc_guild_joined', '/ui/whetstorm/deeds/soc_guild_joined.webp'],
  ['soc_first_sale', '/ui/whetstorm/deeds/soc_first_sale.webp'],
  ['soc_room_for_more', '/ui/whetstorm/deeds/soc_room_for_more.webp'],
  ['soc_pocket_money', '/ui/whetstorm/deeds/soc_pocket_money.webp'],
]);

export function socialMilestoneDeedImageUrl(id: string): string | null {
  return SOCIAL_MILESTONE_DEED_ART.get(id) ?? null;
}
