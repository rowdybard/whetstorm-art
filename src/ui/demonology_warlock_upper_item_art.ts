// Original paintings for the Season 2 Marrowbound demonology warlock upper armor.
const DEMONOLOGY_WARLOCK_UPPER_ART = new Map<string, string>([
  ['vanguard_warlock_demonology_helmet', '/ui/whetstorm/items/vanguard_warlock_demonology_helmet.webp'],
  ['vanguard_warlock_demonology_shoulder', '/ui/whetstorm/items/vanguard_warlock_demonology_shoulder.webp'],
  ['vanguard_warlock_demonology_chest', '/ui/whetstorm/items/vanguard_warlock_demonology_chest.webp'],
]);

export function demonologyWarlockUpperItemImageUrl(id: string): string | null {
  return DEMONOLOGY_WARLOCK_UPPER_ART.get(id) ?? null;
}
