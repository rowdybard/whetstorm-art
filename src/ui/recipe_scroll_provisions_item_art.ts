// Original recipe scroll paintings in a closed map.
const ART = new Map<string, string>([
  ['pattern_reinforced_armor_kit', '/ui/whetstorm/items/pattern_reinforced_armor_kit.webp'],
  ['pattern_stonepot_stew', '/ui/whetstorm/items/pattern_stonepot_stew.webp'],
  ['pattern_warspice_skewers', '/ui/whetstorm/items/pattern_warspice_skewers.webp'],
  ['pattern_sageleaf_chowder', '/ui/whetstorm/items/pattern_sageleaf_chowder.webp'],
]);

export function recipeScrollProvisionsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
