// Original recipe scroll paintings in a closed map.
const ART = new Map<string, string>([
  [
    'pattern_peppered_deepbarb_catfish',
    '/ui/whetstorm/items/pattern_peppered_deepbarb_catfish.webp',
  ],
  [
    'pattern_roast_hollowgill_sturgeon',
    '/ui/whetstorm/items/pattern_roast_hollowgill_sturgeon.webp',
  ],
  ['pattern_grand_cauldron', '/ui/whetstorm/items/pattern_grand_cauldron.webp'],
  ['pattern_laden_hearth', '/ui/whetstorm/items/pattern_laden_hearth.webp'],
]);

export function recipeScrollFishStationsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
