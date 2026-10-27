// Original paintings for four early-zone armor items.
const ARMOR_BATCH_THREE_ITEM_ART = new Map<string, string>([
  ['greyjaw_hide_boots', '/ui/whetstorm/items/greyjaw_hide_boots.webp'],
  ['sableweb_slippers', '/ui/whetstorm/items/sableweb_slippers.webp'],
  ['moggers_stomper_boots', '/ui/whetstorm/items/moggers_stomper_boots.webp'],
  ['cryptbone_helm', '/ui/whetstorm/items/cryptbone_helm.webp'],
]);

export function armorBatchThreeItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_THREE_ITEM_ART.get(id) ?? null;
}
