// Individually painted Whetstorm gathering tools, kept in a closed map.
const TOOL_BATCH_FIVE_ITEM_ART = new Map<string, string>([
  ['silverstream_fishing_rod', '/ui/whetstorm/items/silverstream_fishing_rod.webp'],
  ['ironbark_axe', '/ui/whetstorm/items/ironbark_axe.webp'],
  ['thorium_mining_pick', '/ui/whetstorm/items/thorium_mining_pick.webp'],
  ['goldleaf_sickle', '/ui/whetstorm/items/goldleaf_sickle.webp'],
]);

export function toolBatchFiveItemImageUrl(id: string): string | null {
  return TOOL_BATCH_FIVE_ITEM_ART.get(id) ?? null;
}
