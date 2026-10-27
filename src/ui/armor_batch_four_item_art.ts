// Original paintings for four early-zone armor items.
const ARMOR_BATCH_FOUR_ITEM_ART = new Map<string, string>([
  ['thornling_grips', '/ui/whetstorm/items/thornling_grips.webp'],
  ['votive_chain_belt', '/ui/whetstorm/items/votive_chain_belt.webp'],
  ['oathbound_greaves', '/ui/whetstorm/items/oathbound_greaves.webp'],
  ['gravepath_treads', '/ui/whetstorm/items/gravepath_treads.webp'],
]);

export function armorBatchFourItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_FOUR_ITEM_ART.get(id) ?? null;
}
