// Individually painted Whetstorm gathering tools, kept in a closed map.
const TOOL_BATCH_ITEM_ART = new Map<string, string>([
  ['copper_mining_pick', '/ui/whetstorm/items/copper_mining_pick.webp'],
  ['garden_hoe', '/ui/whetstorm/items/garden_hoe.webp'],
  ['simple_fishing_pole', '/ui/whetstorm/items/simple_fishing_pole.webp'],
  ['gathering_sickle', '/ui/whetstorm/items/gathering_sickle.webp'],
]);

export function toolBatchItemImageUrl(id: string): string | null {
  return TOOL_BATCH_ITEM_ART.get(id) ?? null;
}
