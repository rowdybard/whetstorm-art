// Original paintings for harvested produce, in a closed item-id map.
const FARM_PRODUCE_ORIGINAL_ART = new Map<string, string>([
  ['frost_lentils', '/ui/whetstorm/items/frost_lentils.webp'],
  ['gilded_yam', '/ui/whetstorm/items/gilded_yam.webp'],
  ['evergarden_pumpkin', '/ui/whetstorm/items/evergarden_pumpkin.webp'],
  ['gilded_sunmelon', '/ui/whetstorm/items/gilded_sunmelon.webp'],
]);

export function farmProduceOriginalItemImageUrl(id: string): string | null {
  return FARM_PRODUCE_ORIGINAL_ART.get(id) ?? null;
}
