// Original zone two food and drink paintings in a closed map.
const FOOD_ZONE_TWO_ART = new Map<string, string>([
  ['fenbridge_rye', '/ui/whetstorm/items/fenbridge_rye.webp'],
  ['marsh_mint_tea', '/ui/whetstorm/items/marsh_mint_tea.webp'],
  ['smoked_eel', '/ui/whetstorm/items/smoked_eel.webp'],
  ['silvermist_cordial', '/ui/whetstorm/items/silvermist_cordial.webp'],
]);

export function foodZoneTwoItemImageUrl(id: string): string | null {
  return FOOD_ZONE_TWO_ART.get(id) ?? null;
}
