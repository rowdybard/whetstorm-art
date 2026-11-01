// Original Ironmarch Season 2 upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_warrior_prot_helmet', '/ui/whetstorm/items/vanguard_warrior_prot_helmet.webp'],
  ['vanguard_warrior_prot_shoulder', '/ui/whetstorm/items/vanguard_warrior_prot_shoulder.webp'],
  ['vanguard_warrior_prot_chest', '/ui/whetstorm/items/vanguard_warrior_prot_chest.webp'],
]);

export function ironmarchUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
