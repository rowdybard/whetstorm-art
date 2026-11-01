// Original paintings for the Season 2 Brawlmark combat rogue upper armor.
const COMBAT_ROGUE_UPPER_ART = new Map<string, string>([
  ['vanguard_rogue_combat_helmet', '/ui/whetstorm/items/vanguard_rogue_combat_helmet.webp'],
  ['vanguard_rogue_combat_shoulder', '/ui/whetstorm/items/vanguard_rogue_combat_shoulder.webp'],
  ['vanguard_rogue_combat_chest', '/ui/whetstorm/items/vanguard_rogue_combat_chest.webp'],
]);

export function combatRogueUpperItemImageUrl(id: string): string | null {
  return COMBAT_ROGUE_UPPER_ART.get(id) ?? null;
}
