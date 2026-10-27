// Original paintings for four early-zone armor items.
const ARMOR_BATCH_TWELVE_ITEM_ART = new Map<string, string>([
  ['marshstalker_jerkin', '/ui/whetstorm/items/marshstalker_jerkin.webp'],
  ['marshstalker_spaulders', '/ui/whetstorm/items/marshstalker_spaulders.webp'],
  ['ironlink_hauberk', '/ui/whetstorm/items/ironlink_hauberk.webp'],
  ['ironlink_legguards', '/ui/whetstorm/items/ironlink_legguards.webp'],
]);

export function armorBatchTwelveItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_TWELVE_ITEM_ART.get(id) ?? null;
}
