// Original Bladewake Season 2 upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_warrior_arms_helmet', '/ui/whetstorm/items/vanguard_warrior_arms_helmet.webp'],
  ['vanguard_warrior_arms_shoulder', '/ui/whetstorm/items/vanguard_warrior_arms_shoulder.webp'],
  ['vanguard_warrior_arms_chest', '/ui/whetstorm/items/vanguard_warrior_arms_chest.webp'],
]);

export function bladewakeUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
