// Original Sunvigil Season 2 upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_paladin_holy_helmet', '/ui/whetstorm/items/vanguard_paladin_holy_helmet.webp'],
  ['vanguard_paladin_holy_shoulder', '/ui/whetstorm/items/vanguard_paladin_holy_shoulder.webp'],
  ['vanguard_paladin_holy_chest', '/ui/whetstorm/items/vanguard_paladin_holy_chest.webp'],
]);

export function sunvigilUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
