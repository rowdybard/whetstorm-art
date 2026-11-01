// Original paintings for the Season 2 Marrowbound demonology warlock lower armor.
const DEMONOLOGY_WARLOCK_LOWER_ART = new Map<string, string>([
  ['vanguard_warlock_demonology_legs', '/ui/whetstorm/items/vanguard_warlock_demonology_legs.webp'],
  ['vanguard_warlock_demonology_gloves', '/ui/whetstorm/items/vanguard_warlock_demonology_gloves.webp'],
]);

export function demonologyWarlockLowerItemImageUrl(id: string): string | null {
  return DEMONOLOGY_WARLOCK_LOWER_ART.get(id) ?? null;
}
