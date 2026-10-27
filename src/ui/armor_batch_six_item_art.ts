// Original paintings for four early-zone armor items.
const ARMOR_BATCH_SIX_ITEM_ART = new Map<string, string>([
  ['marrowtread_boots', '/ui/whetstorm/items/marrowtread_boots.webp'],
  ['sextons_slippers', '/ui/whetstorm/items/sextons_slippers.webp'],
  ['gravewalker_softboots', '/ui/whetstorm/items/gravewalker_softboots.webp'],
  ['cryptbone_greaves', '/ui/whetstorm/items/cryptbone_greaves.webp'],
]);

export function armorBatchSixItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_SIX_ITEM_ART.get(id) ?? null;
}
