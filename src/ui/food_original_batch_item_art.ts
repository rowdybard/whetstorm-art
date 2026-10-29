// Original food paintings in a closed map.
const FOOD_ORIGINAL_BATCH_ART = new Map<string, string>([
  ['herbed_marsh_pike', '/ui/whetstorm/items/herbed_marsh_pike.webp'],
  ['ashwood_smoked_eel', '/ui/whetstorm/items/ashwood_smoked_eel.webp'],
  ['goldleaf_game_stew', '/ui/whetstorm/items/goldleaf_game_stew.webp'],
  ['conjured_bread2', '/ui/whetstorm/items/conjured_bread2.webp'],
]);

export function foodOriginalBatchItemImageUrl(id: string): string | null {
  return FOOD_ORIGINAL_BATCH_ART.get(id) ?? null;
}
