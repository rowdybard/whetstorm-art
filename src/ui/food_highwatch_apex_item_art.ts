// Original Highwatch and later cooking food paintings in a closed map.
const FOOD_HIGHWATCH_APEX_ART = new Map<string, string>([
  ['roast_mountain_goat', '/ui/whetstorm/items/roast_mountain_goat.webp'],
  ['stonepot_stew', '/ui/whetstorm/items/stonepot_stew.webp'],
  ['warspice_skewers', '/ui/whetstorm/items/warspice_skewers.webp'],
  ['sageleaf_chowder', '/ui/whetstorm/items/sageleaf_chowder.webp'],
]);

export function foodHighwatchApexItemImageUrl(id: string): string | null {
  return FOOD_HIGHWATCH_APEX_ART.get(id) ?? null;
}
