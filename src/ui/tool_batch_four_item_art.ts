// Individually painted Whetstorm gathering tools, kept in a closed map.
const TOOL_BATCH_FOUR_ITEM_ART = new Map<string, string>([
  ['ironreel_fishing_rod', '/ui/whetstorm/items/ironreel_fishing_rod.webp'],
  ['felling_axe', '/ui/whetstorm/items/felling_axe.webp'],
  ['mithril_mining_pick', '/ui/whetstorm/items/mithril_mining_pick.webp'],
  ['silverleaf_sickle', '/ui/whetstorm/items/silverleaf_sickle.webp'],
]);

export function toolBatchFourItemImageUrl(id: string): string | null {
  return TOOL_BATCH_FOUR_ITEM_ART.get(id) ?? null;
}
