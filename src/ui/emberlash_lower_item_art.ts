// Original paintings for the Season 2 Emberlash fire mage lower armor.
const EMBERLASH_LOWER_ART = new Map<string, string>([
  ['vanguard_mage_fire_legs', '/ui/whetstorm/items/vanguard_mage_fire_legs.webp'],
  ['vanguard_mage_fire_gloves', '/ui/whetstorm/items/vanguard_mage_fire_gloves.webp'],
]);

export function emberlashLowerItemImageUrl(id: string): string | null {
  return EMBERLASH_LOWER_ART.get(id) ?? null;
}
