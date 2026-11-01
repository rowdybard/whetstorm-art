// Original paintings for the Season 2 Farsight marksmanship hunter lower armor.
const MARKSMANSHIP_HUNTER_LOWER_ART = new Map<string, string>([
  ['vanguard_hunter_marksmanship_legs', '/ui/whetstorm/items/vanguard_hunter_marksmanship_legs.webp'],
  ['vanguard_hunter_marksmanship_gloves', '/ui/whetstorm/items/vanguard_hunter_marksmanship_gloves.webp'],
]);

export function marksmanshipHunterLowerItemImageUrl(id: string): string | null {
  return MARKSMANSHIP_HUNTER_LOWER_ART.get(id) ?? null;
}
