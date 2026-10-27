// Original paintings for four early-zone armor items.
const ARMOR_BATCH_FOURTEEN_ITEM_ART = new Map<string, string>([
  ['mirejaw_scale_vest', '/ui/whetstorm/items/mirejaw_scale_vest.webp'],
  ['mirebloom_treads', '/ui/whetstorm/items/mirebloom_treads.webp'],
  ['fenbark_leggings', '/ui/whetstorm/items/fenbark_leggings.webp'],
  ['marshstrider_boots', '/ui/whetstorm/items/marshstrider_boots.webp'],
]);

export function armorBatchFourteenItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_FOURTEEN_ITEM_ART.get(id) ?? null;
}
