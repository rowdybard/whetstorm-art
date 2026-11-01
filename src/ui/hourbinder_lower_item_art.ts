// Original Hourbinder Season 2 lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_mage_arcane_legs', '/ui/whetstorm/items/vanguard_mage_arcane_legs.webp'],
  ['vanguard_mage_arcane_gloves', '/ui/whetstorm/items/vanguard_mage_arcane_gloves.webp'],
]);

export function hourbinderLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
