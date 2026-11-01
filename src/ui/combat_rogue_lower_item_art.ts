// Original paintings for the Season 2 Brawlmark combat rogue lower armor.
const COMBAT_ROGUE_LOWER_ART = new Map<string, string>([
  ['vanguard_rogue_combat_legs', '/ui/whetstorm/items/vanguard_rogue_combat_legs.webp'],
  ['vanguard_rogue_combat_gloves', '/ui/whetstorm/items/vanguard_rogue_combat_gloves.webp'],
]);

export function combatRogueLowerItemImageUrl(id: string): string | null {
  return COMBAT_ROGUE_LOWER_ART.get(id) ?? null;
}
