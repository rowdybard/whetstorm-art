// Original paintings for waterway quest objects. Closed mapping prevents arbitrary paths.
const QUEST_BATCH_WATERWAYS = new Map<string, string>([
  ['wisplight_globe', '/ui/whetstorm/items/wisplight_globe.webp'],
  ['fenway_mooring_line', '/ui/whetstorm/items/fenway_mooring_line.webp'],
  ['bridgemere_toll_chest', '/ui/whetstorm/items/bridgemere_toll_chest.webp'],
  ['amberfall_sap_bucket', '/ui/whetstorm/items/amberfall_sap_bucket.webp'],
]);

export function questBatchWaterwaysItemImageUrl(id: string): string | null {
  return QUEST_BATCH_WATERWAYS.get(id) ?? null;
}
