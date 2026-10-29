// Original paintings for farm produce and fine harvests.
const FARM_PRODUCE_FINE_ART = new Map<string, string>([
  ['evergarden_greens', '/ui/whetstorm/items/evergarden_greens.webp'],
  ['fine_frost_lentils', '/ui/whetstorm/items/fine_frost_lentils.webp'],
  ['fine_gilded_yam', '/ui/whetstorm/items/fine_gilded_yam.webp'],
  ['fine_evergarden_pumpkin', '/ui/whetstorm/items/fine_evergarden_pumpkin.webp'],
]);

export function farmProduceFineItemImageUrl(id: string): string | null {
  return FARM_PRODUCE_FINE_ART.get(id) ?? null;
}
