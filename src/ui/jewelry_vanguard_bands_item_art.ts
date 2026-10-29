// Original Vanguard band paintings in a closed map.
const ART = new Map<string, string>([
  ['vanguard_band_of_might', '/ui/whetstorm/items/vanguard_band_of_might.webp'],
  ['vanguard_band_of_precision', '/ui/whetstorm/items/vanguard_band_of_precision.webp'],
  ['vanguard_band_of_focus', '/ui/whetstorm/items/vanguard_band_of_focus.webp'],
  ['vanguard_band_of_mending', '/ui/whetstorm/items/vanguard_band_of_mending.webp'],
]);

export function jewelryVanguardBandsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
