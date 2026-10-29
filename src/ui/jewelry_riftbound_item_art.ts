// Original Riftbound jewelry paintings in a closed map.
const ART = new Map<string, string>([
  ['riftbound_band_of_might', '/ui/whetstorm/items/riftbound_band_of_might.webp'],
  ['riftbound_band_of_insight', '/ui/whetstorm/items/riftbound_band_of_insight.webp'],
  ['riftbound_band_of_guile', '/ui/whetstorm/items/riftbound_band_of_guile.webp'],
  ['heart_of_the_rift', '/ui/whetstorm/items/heart_of_the_rift.webp'],
]);

export function jewelryRiftboundItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
