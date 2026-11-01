// Original paintings for retained, no-longer-earnable Vale Cup feats.
const VALE_CUP_FIVE_DEED_ART = new Map<string, string>([
  ['pvp_vcup_hat_trick', '/ui/whetstorm/deeds/pvp_vcup_hat_trick.webp'],
  ['pvp_vcup_golden_goal', '/ui/whetstorm/deeds/pvp_vcup_golden_goal.webp'],
  ['pvp_vcup_first_save', '/ui/whetstorm/deeds/pvp_vcup_first_save.webp'],
  ['pvp_vcup_clean_sheet', '/ui/whetstorm/deeds/pvp_vcup_clean_sheet.webp'],
  ['pvp_vcup_guild_win', '/ui/whetstorm/deeds/pvp_vcup_guild_win.webp'],
]);

export function valeCupFiveDeedImageUrl(id: string): string | null {
  return VALE_CUP_FIVE_DEED_ART.get(id) ?? null;
}
