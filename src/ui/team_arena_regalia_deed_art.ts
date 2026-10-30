// Original paintings for team arena and armor collection deeds.
const TEAM_ARENA_REGALIA_DEED_ART = new Map<string, string>([
  ['pvp_arena_2v2_1600', '/ui/whetstorm/deeds/pvp_arena_2v2_1600.webp'],
  ['pvp_arena_2v2_1750', '/ui/whetstorm/deeds/pvp_arena_2v2_1750.webp'],
  ['pvp_arena_2v2_1900', '/ui/whetstorm/deeds/pvp_arena_2v2_1900.webp'],
  ['col_seven_regalia', '/ui/whetstorm/deeds/col_seven_regalia.webp'],
]);

export function teamArenaRegaliaDeedImageUrl(id: string): string | null {
  return TEAM_ARENA_REGALIA_DEED_ART.get(id) ?? null;
}
