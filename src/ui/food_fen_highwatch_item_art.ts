// Original Fenbridge and Highwatch food and drink paintings in a closed map.
const FOOD_FEN_HIGHWATCH_ART = new Map<string, string>([
  ['fenbridge_beet_braise', '/ui/whetstorm/items/fenbridge_beet_braise.webp'],
  ['fenbridge_rice_pudding', '/ui/whetstorm/items/fenbridge_rice_pudding.webp'],
  ['glacier_melt', '/ui/whetstorm/items/glacier_melt.webp'],
  ['highwatch_barley_porridge', '/ui/whetstorm/items/highwatch_barley_porridge.webp'],
]);

export function foodFenHighwatchItemImageUrl(id: string): string | null {
  return FOOD_FEN_HIGHWATCH_ART.get(id) ?? null;
}
