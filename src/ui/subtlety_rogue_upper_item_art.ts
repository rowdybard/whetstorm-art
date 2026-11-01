// Original paintings for the Season 2 Shadewalk subtlety rogue upper armor.
const SUBTLETY_ROGUE_UPPER_ART = new Map<string, string>([
  ['vanguard_rogue_subtlety_helmet', '/ui/whetstorm/items/vanguard_rogue_subtlety_helmet.webp'],
  ['vanguard_rogue_subtlety_shoulder', '/ui/whetstorm/items/vanguard_rogue_subtlety_shoulder.webp'],
  ['vanguard_rogue_subtlety_chest', '/ui/whetstorm/items/vanguard_rogue_subtlety_chest.webp'],
]);

export function subtletyRogueUpperItemImageUrl(id: string): string | null {
  return SUBTLETY_ROGUE_UPPER_ART.get(id) ?? null;
}
