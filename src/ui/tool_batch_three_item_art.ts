// Individually painted Whetstorm gathering tools, kept in a closed map.
const TOOL_BATCH_THREE_ITEM_ART = new Map<string, string>([
  ['field_kit', '/ui/whetstorm/items/field_kit.webp'],
  ['handaxe', '/ui/whetstorm/items/handaxe.webp'],
  ['iron_mining_pick', '/ui/whetstorm/items/iron_mining_pick.webp'],
  ['bronze_sickle', '/ui/whetstorm/items/bronze_sickle.webp'],
]);

export function toolBatchThreeItemImageUrl(id: string): string | null {
  return TOOL_BATCH_THREE_ITEM_ART.get(id) ?? null;
}
