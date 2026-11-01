// Original Whetstorm paintings for the Tarnished and Sovereign Collapsar rings.
const ART: ReadonlyMap<string, string> = new Map([
  ['rare_collapsar_band_of_nyxaris', '/ui/whetstorm/items/rare_collapsar_band_of_nyxaris.webp'],
  [
    'legendary_collapsar_band_of_nyxaris',
    '/ui/whetstorm/items/legendary_collapsar_band_of_nyxaris.webp',
  ],
]);

export function collapsarRingTierItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
