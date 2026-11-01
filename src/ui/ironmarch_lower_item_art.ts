// Original Ironmarch Season 2 lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_warrior_prot_legs', '/ui/whetstorm/items/vanguard_warrior_prot_legs.webp'],
  ['vanguard_warrior_prot_gloves', '/ui/whetstorm/items/vanguard_warrior_prot_gloves.webp'],
]);

export function ironmarchLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
