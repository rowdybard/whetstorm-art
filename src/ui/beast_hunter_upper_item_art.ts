// Original paintings for the Season 2 Packwarden beast mastery hunter upper armor.
const BEAST_HUNTER_UPPER_ART = new Map<string, string>([
  ['vanguard_hunter_beast_mastery_helmet', '/ui/whetstorm/items/vanguard_hunter_beast_mastery_helmet.webp'],
  ['vanguard_hunter_beast_mastery_shoulder', '/ui/whetstorm/items/vanguard_hunter_beast_mastery_shoulder.webp'],
  ['vanguard_hunter_beast_mastery_chest', '/ui/whetstorm/items/vanguard_hunter_beast_mastery_chest.webp'],
]);

export function beastHunterUpperItemImageUrl(id: string): string | null {
  return BEAST_HUNTER_UPPER_ART.get(id) ?? null;
}
