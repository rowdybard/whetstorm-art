// Original paintings for lifetime honor and Card Duel milestones.
const ART: ReadonlyMap<string, string> = new Map([
  ['pvp_honor_sergeant', '/ui/whetstorm/deeds/pvp_honor_sergeant.webp'],
  ['pvp_honor_knight_lieutenant', '/ui/whetstorm/deeds/pvp_honor_knight_lieutenant.webp'],
  ['pvp_honor_field_marshal', '/ui/whetstorm/deeds/pvp_honor_field_marshal.webp'],
  ['pvp_card_duel_first_win', '/ui/whetstorm/deeds/pvp_card_duel_first_win.webp'],
  ['pvp_flag_1h', '/ui/whetstorm/deeds/pvp_flag_1h.webp'],
  ['pvp_flag_3h', '/ui/whetstorm/deeds/pvp_flag_3h.webp'],
  ['pvp_flag_6h', '/ui/whetstorm/deeds/pvp_flag_6h.webp'],
  ['pvp_flag_24h', '/ui/whetstorm/deeds/pvp_flag_24h.webp'],
  ['pvp_flag_168h', '/ui/whetstorm/deeds/pvp_flag_168h.webp'],
]);

export function pvpHonorCardsDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
