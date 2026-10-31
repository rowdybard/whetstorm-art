// Original paintings for Nythraxis apex recipe patterns.
const ART = new Map<string, string>([
  ['pattern_duskforged_bulwark', '/ui/whetstorm/items/pattern_duskforged_bulwark.webp'],
  ['pattern_gyrelens_array', '/ui/whetstorm/items/pattern_gyrelens_array.webp'],
  ['pattern_voidbound_grimoire', '/ui/whetstorm/items/pattern_voidbound_grimoire.webp'],
]);

export function nythraxisApexPatternItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
