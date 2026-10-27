// Original paintings for four early-zone armor items.
const ARMOR_BATCH_EIGHT_ITEM_ART = new Map<string, string>([
  ['eastbrook_wool_trousers', '/ui/whetstorm/items/eastbrook_wool_trousers.webp'],
  ['eastbrook_ritual_vestments', '/ui/whetstorm/items/eastbrook_ritual_vestments.webp'],
  ['eastbrook_druids_hide', '/ui/whetstorm/items/eastbrook_druids_hide.webp'],
  ['eastbrook_warded_leggings', '/ui/whetstorm/items/eastbrook_warded_leggings.webp'],
]);

export function armorBatchEightItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_EIGHT_ITEM_ART.get(id) ?? null;
}
