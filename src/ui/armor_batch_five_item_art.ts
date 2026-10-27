// Original paintings for four early-zone armor items.
const ARMOR_BATCH_FIVE_ITEM_ART = new Map<string, string>([
  ['cryptstalker_jerkin', '/ui/whetstorm/items/cryptstalker_jerkin.webp'],
  ['hollowbone_hauberk', '/ui/whetstorm/items/hollowbone_hauberk.webp'],
  ['gravewoven_raiment', '/ui/whetstorm/items/gravewoven_raiment.webp'],
  ['cryptbone_pauldrons', '/ui/whetstorm/items/cryptbone_pauldrons.webp'],
]);

export function armorBatchFiveItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_FIVE_ITEM_ART.get(id) ?? null;
}
