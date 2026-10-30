// Original paintings for the fishing collection and first competitive deeds.
const CREEL_ARENA_DEED_ART = new Map<string, string>([
  ['col_full_creel', '/ui/whetstorm/deeds/col_full_creel.webp'],
  ['pvp_arena_first_match', '/ui/whetstorm/deeds/pvp_arena_first_match.webp'],
  ['pvp_arena_first_win', '/ui/whetstorm/deeds/pvp_arena_first_win.webp'],
  ['pvp_duel_first_win', '/ui/whetstorm/deeds/pvp_duel_first_win.webp'],
]);

export function creelArenaDeedImageUrl(id: string): string | null {
  return CREEL_ARENA_DEED_ART.get(id) ?? null;
}
