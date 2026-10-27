// Original paintings for four early-zone armor items.
const ARMOR_BATCH_TEN_ITEM_ART = new Map<string, string>([
  ['homespun_mitts', '/ui/whetstorm/items/homespun_mitts.webp'],
  ['silverthread_slippers', '/ui/whetstorm/items/silverthread_slippers.webp'],
  ['fenbridge_hide_leggings', '/ui/whetstorm/items/fenbridge_hide_leggings.webp'],
  ['fenbridge_hide_belt', '/ui/whetstorm/items/fenbridge_hide_belt.webp'],
]);

export function armorBatchTenItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_TEN_ITEM_ART.get(id) ?? null;
}
