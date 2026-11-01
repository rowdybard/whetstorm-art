// Original paintings for the Season 2 Farsight marksmanship hunter upper armor.
const MARKSMANSHIP_HUNTER_UPPER_ART = new Map<string, string>([
  ['vanguard_hunter_marksmanship_helmet', '/ui/whetstorm/items/vanguard_hunter_marksmanship_helmet.webp'],
  ['vanguard_hunter_marksmanship_shoulder', '/ui/whetstorm/items/vanguard_hunter_marksmanship_shoulder.webp'],
  ['vanguard_hunter_marksmanship_chest', '/ui/whetstorm/items/vanguard_hunter_marksmanship_chest.webp'],
]);

export function marksmanshipHunterUpperItemImageUrl(id: string): string | null {
  return MARKSMANSHIP_HUNTER_UPPER_ART.get(id) ?? null;
}
