// Original paintings for the three apex feast recipes.
const ART = new Map<string, string>([
  ['pattern_stonepot_feast', '/ui/whetstorm/items/pattern_stonepot_feast.webp'],
  ['pattern_warspice_feast', '/ui/whetstorm/items/pattern_warspice_feast.webp'],
  ['pattern_sageleaf_feast', '/ui/whetstorm/items/pattern_sageleaf_feast.webp'],
]);

export function apexFeastRecipeItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
