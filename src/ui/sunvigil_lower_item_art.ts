// Original Sunvigil Season 2 lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_paladin_holy_legs', '/ui/whetstorm/items/vanguard_paladin_holy_legs.webp'],
  ['vanguard_paladin_holy_gloves', '/ui/whetstorm/items/vanguard_paladin_holy_gloves.webp'],
]);

export function sunvigilLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
