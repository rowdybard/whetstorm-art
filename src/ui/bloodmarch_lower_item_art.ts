// Original Bloodmarch Season 2 lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_warrior_fury_legs', '/ui/whetstorm/items/vanguard_warrior_fury_legs.webp'],
  ['vanguard_warrior_fury_gloves', '/ui/whetstorm/items/vanguard_warrior_fury_gloves.webp'],
]);

export function bloodmarchLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
