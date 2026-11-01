// Original Bloodmarch Season 2 upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_warrior_fury_helmet', '/ui/whetstorm/items/vanguard_warrior_fury_helmet.webp'],
  ['vanguard_warrior_fury_shoulder', '/ui/whetstorm/items/vanguard_warrior_fury_shoulder.webp'],
  ['vanguard_warrior_fury_chest', '/ui/whetstorm/items/vanguard_warrior_fury_chest.webp'],
]);

export function bloodmarchUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
