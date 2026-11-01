// Original Bladewake Season 2 lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_warrior_arms_legs', '/ui/whetstorm/items/vanguard_warrior_arms_legs.webp'],
  ['vanguard_warrior_arms_gloves', '/ui/whetstorm/items/vanguard_warrior_arms_gloves.webp'],
]);

export function bladewakeLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
