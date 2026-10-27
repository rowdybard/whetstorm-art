// Original paintings for four early-zone armor items.
const ARMOR_BATCH_TWO_ITEM_ART = new Map<string, string>([
  ['milepost_boots', '/ui/whetstorm/items/milepost_boots.webp'],
  ['greyjaw_pelt_cloak', '/ui/whetstorm/items/greyjaw_pelt_cloak.webp'],
  ['oiled_boots', '/ui/whetstorm/items/oiled_boots.webp'],
  ['quilted_trousers', '/ui/whetstorm/items/quilted_trousers.webp'],
]);

export function armorBatchTwoItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_TWO_ITEM_ART.get(id) ?? null;
}
