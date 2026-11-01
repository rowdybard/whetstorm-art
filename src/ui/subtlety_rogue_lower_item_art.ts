// Original paintings for the Season 2 Shadewalk subtlety rogue lower armor.
const SUBTLETY_ROGUE_LOWER_ART = new Map<string, string>([
  ['vanguard_rogue_subtlety_legs', '/ui/whetstorm/items/vanguard_rogue_subtlety_legs.webp'],
  ['vanguard_rogue_subtlety_gloves', '/ui/whetstorm/items/vanguard_rogue_subtlety_gloves.webp'],
]);

export function subtletyRogueLowerItemImageUrl(id: string): string | null {
  return SUBTLETY_ROGUE_LOWER_ART.get(id) ?? null;
}
