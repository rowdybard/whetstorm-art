// Original paintings for lifetime honor and Card Duel milestones.
const ART: ReadonlyMap<string, string> = new Map([
  ['pvp_honor_sergeant', '/ui/whetstorm/deeds/pvp_honor_sergeant.webp'],
  ['pvp_honor_knight_lieutenant', '/ui/whetstorm/deeds/pvp_honor_knight_lieutenant.webp'],
  ['pvp_honor_field_marshal', '/ui/whetstorm/deeds/pvp_honor_field_marshal.webp'],
  ['pvp_card_duel_first_win', '/ui/whetstorm/deeds/pvp_card_duel_first_win.webp'],
]);

export function pvpHonorCardsDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
