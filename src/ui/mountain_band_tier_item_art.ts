// Original Mountain's Weight hoard tier paintings.
const ART = new Map<string, string>([
  ['rare_band_mountains_weight', '/ui/whetstorm/items/rare_band_mountains_weight.webp'],
  ['legendary_band_mountains_weight', '/ui/whetstorm/items/legendary_band_mountains_weight.webp'],
]);

export function mountainBandTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
