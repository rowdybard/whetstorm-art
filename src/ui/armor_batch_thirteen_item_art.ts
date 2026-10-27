// Original paintings for four early-zone armor items.
const ARMOR_BATCH_THIRTEEN_ITEM_ART = new Map<string, string>([
  ['ironlink_spaulders', '/ui/whetstorm/items/ironlink_spaulders.webp'],
  ['silkbinders_raiment', '/ui/whetstorm/items/silkbinders_raiment.webp'],
  ['sunweave_mantle', '/ui/whetstorm/items/sunweave_mantle.webp'],
  ['sunweave_treads', '/ui/whetstorm/items/sunweave_treads.webp'],
]);

export function armorBatchThirteenItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_THIRTEEN_ITEM_ART.get(id) ?? null;
}
