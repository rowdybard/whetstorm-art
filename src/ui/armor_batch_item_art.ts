// Original paintings for four early-zone armor drops.
const ARMOR_BATCH_ITEM_ART = new Map<string, string>([
  ['trail_leggings', '/ui/whetstorm/items/trail_leggings.webp'],
  ['mosshide_vest', '/ui/whetstorm/items/mosshide_vest.webp'],
  ['acolyte_chain_grips', '/ui/whetstorm/items/acolyte_chain_grips.webp'],
  ['mossy_handwraps', '/ui/whetstorm/items/mossy_handwraps.webp'],
]);

export function armorBatchItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_ITEM_ART.get(id) ?? null;
}
