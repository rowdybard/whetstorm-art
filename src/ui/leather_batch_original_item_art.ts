// Original paintings for early leather armor.
const LEATHER_BATCH_ORIGINAL_ITEM_ART = new Map<string, string>([
  ['hollowbound_legguards', '/ui/whetstorm/items/hollowbound_legguards.webp'],
  ['bramblehide_jerkin', '/ui/whetstorm/items/bramblehide_jerkin.webp'],
  ['wayfarers_hood', '/ui/whetstorm/items/wayfarers_hood.webp'],
  ['sturdy_belt', '/ui/whetstorm/items/sturdy_belt.webp'],
]);

export function leatherBatchOriginalItemImageUrl(id: string): string | null {
  return LEATHER_BATCH_ORIGINAL_ITEM_ART.get(id) ?? null;
}
