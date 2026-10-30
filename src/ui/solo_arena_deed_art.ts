// Original paintings for solo arena and duel deeds.
const SOLO_ARENA_DEED_ART = new Map<string, string>([
  ['pvp_duel_grace', '/ui/whetstorm/deeds/pvp_duel_grace.webp'],
  ['pvp_arena_1v1_1600', '/ui/whetstorm/deeds/pvp_arena_1v1_1600.webp'],
  ['pvp_arena_1v1_1750', '/ui/whetstorm/deeds/pvp_arena_1v1_1750.webp'],
  ['pvp_arena_1v1_1900', '/ui/whetstorm/deeds/pvp_arena_1v1_1900.webp'],
]);

export function soloArenaDeedImageUrl(id: string): string | null {
  return SOLO_ARENA_DEED_ART.get(id) ?? null;
}
