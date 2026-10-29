// Original paintings for obtainable cloth armor.
const CLOTH_BATCH_FIVE_ITEM_ART = new Map<string, string>([
  ['peakwool_robe', '/ui/whetstorm/items/peakwool_robe.webp'],
  ['shardsong_mantle', '/ui/whetstorm/items/shardsong_mantle.webp'],
  ['wyrmcult_spellgrips', '/ui/whetstorm/items/wyrmcult_spellgrips.webp'],
  ['drownstep_slippers', '/ui/whetstorm/items/drownstep_slippers.webp'],
]);

export function clothBatchFiveItemImageUrl(id: string): string | null {
  return CLOTH_BATCH_FIVE_ITEM_ART.get(id) ?? null;
}
