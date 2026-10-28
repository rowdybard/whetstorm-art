// Original paintings for four early marsh vendor armor pieces.
const ARMOR_BATCH_NINETEEN_ITEM_ART = new Map<string, string>([
  ['bogiron_hauberk', '/ui/whetstorm/items/bogiron_hauberk.webp'],
  ['marshcloth_robe', '/ui/whetstorm/items/marshcloth_robe.webp'],
  ['reedwoven_jerkin', '/ui/whetstorm/items/reedwoven_jerkin.webp'],
  ['reedwoven_trousers', '/ui/whetstorm/items/reedwoven_trousers.webp'],
]);

export function armorBatchNineteenItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_NINETEEN_ITEM_ART.get(id) ?? null;
}
