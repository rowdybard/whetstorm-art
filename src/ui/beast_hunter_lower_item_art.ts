// Original paintings for the Season 2 Packwarden beast mastery hunter lower armor.
const BEAST_HUNTER_LOWER_ART = new Map<string, string>([
  ['vanguard_hunter_beast_mastery_legs', '/ui/whetstorm/items/vanguard_hunter_beast_mastery_legs.webp'],
  ['vanguard_hunter_beast_mastery_gloves', '/ui/whetstorm/items/vanguard_hunter_beast_mastery_gloves.webp'],
]);

export function beastHunterLowerItemImageUrl(id: string): string | null {
  return BEAST_HUNTER_LOWER_ART.get(id) ?? null;
}
