// Original paintings for the Season 2 Hourbinder arcane mage upper armor.
const ARCANE_MAGE_UPPER_ART = new Map<string, string>([
  ['vanguard_mage_arcane_helmet', '/ui/whetstorm/items/vanguard_mage_arcane_helmet.webp'],
  ['vanguard_mage_arcane_shoulder', '/ui/whetstorm/items/vanguard_mage_arcane_shoulder.webp'],
  ['vanguard_mage_arcane_chest', '/ui/whetstorm/items/vanguard_mage_arcane_chest.webp'],
]);

export function arcaneMageUpperItemImageUrl(id: string): string | null {
  return ARCANE_MAGE_UPPER_ART.get(id) ?? null;
}
