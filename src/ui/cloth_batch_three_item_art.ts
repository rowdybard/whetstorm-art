// Original paintings for obtainable cloth armor.
const CLOTH_BATCH_THREE_ITEM_ART = new Map<string, string>([
  ['reliquary_cloth_chest', '/ui/whetstorm/items/reliquary_cloth_chest.webp'],
  ['reliquary_legs', '/ui/whetstorm/items/reliquary_legs.webp'],
  ['cantors_drowned_sash', '/ui/whetstorm/items/cantors_drowned_sash.webp'],
  ['tidehymn_slippers', '/ui/whetstorm/items/tidehymn_slippers.webp'],
]);

export function clothBatchThreeItemImageUrl(id: string): string | null {
  return CLOTH_BATCH_THREE_ITEM_ART.get(id) ?? null;
}
