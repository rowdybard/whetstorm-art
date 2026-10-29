// Original paintings for crafted leather armor.
const LEATHER_BATCH_CRAFTED_ITEM_ART = new Map<string, string>([
  ['mirewarden_jerkin', '/ui/whetstorm/items/mirewarden_jerkin.webp'],
  ['mirewarden_leggings', '/ui/whetstorm/items/mirewarden_leggings.webp'],
  ['mirewarden_treads', '/ui/whetstorm/items/mirewarden_treads.webp'],
  ['briarstep_jerkin', '/ui/whetstorm/items/briarstep_jerkin.webp'],
]);

export function leatherBatchCraftedItemImageUrl(id: string): string | null {
  return LEATHER_BATCH_CRAFTED_ITEM_ART.get(id) ?? null;
}
