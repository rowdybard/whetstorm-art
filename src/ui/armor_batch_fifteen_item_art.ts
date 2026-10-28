// Original paintings for four early marsh armor items.
const ARMOR_BATCH_FIFTEEN_ITEM_ART = new Map<string, string>([
  ['broodmother_silk_robe', '/ui/whetstorm/items/broodmother_silk_robe.webp'],
  ['fenwarden_sabatons', '/ui/whetstorm/items/fenwarden_sabatons.webp'],
  ['marshlight_hauberk', '/ui/whetstorm/items/marshlight_hauberk.webp'],
  ['duskthorn_mantle', '/ui/whetstorm/items/duskthorn_mantle.webp'],
]);

export function armorBatchFifteenItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_FIFTEEN_ITEM_ART.get(id) ?? null;
}
