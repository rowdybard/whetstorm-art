// Original paintings for early Mirefen armor.
const ARMOR_BATCH_TWENTY_ITEM_ART = new Map<string, string>([
  ['fenwalker_boots', '/ui/whetstorm/items/fenwalker_boots.webp'],
  ['tidescale_vest', '/ui/whetstorm/items/tidescale_vest.webp'],
  ['tideguard_greaves', '/ui/whetstorm/items/tideguard_greaves.webp'],
  ['tideguard_sabatons', '/ui/whetstorm/items/tideguard_sabatons.webp'],
]);

export function armorBatchTwentyItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_TWENTY_ITEM_ART.get(id) ?? null;
}
