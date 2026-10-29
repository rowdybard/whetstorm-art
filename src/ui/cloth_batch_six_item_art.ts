// Original paintings for obtainable Thornpeak cloth armor.
const CLOTH_BATCH_SIX_ITEM_ART = new Map<string, string>([
  ['ridgestalker_treads', '/ui/whetstorm/items/ridgestalker_treads.webp'],
  ['stormshard_leggings', '/ui/whetstorm/items/stormshard_leggings.webp'],
  ['revenant_silk_robe', '/ui/whetstorm/items/revenant_silk_robe.webp'],
  ['korgaths_chainwraps', '/ui/whetstorm/items/korgaths_chainwraps.webp'],
]);

export function clothBatchSixItemImageUrl(id: string): string | null {
  return CLOTH_BATCH_SIX_ITEM_ART.get(id) ?? null;
}
