// Original paintings for the Season 2 Emberlash fire mage upper armor.
const EMBERLASH_UPPER_ART = new Map<string, string>([
  ['vanguard_mage_fire_helmet', '/ui/whetstorm/items/vanguard_mage_fire_helmet.webp'],
  ['vanguard_mage_fire_shoulder', '/ui/whetstorm/items/vanguard_mage_fire_shoulder.webp'],
  ['vanguard_mage_fire_chest', '/ui/whetstorm/items/vanguard_mage_fire_chest.webp'],
]);

export function emberlashUpperItemImageUrl(id: string): string | null {
  return EMBERLASH_UPPER_ART.get(id) ?? null;
}
