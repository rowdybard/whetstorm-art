// Original later cooking food paintings in a closed map.
const FOOD_LATER_FISH_HARVEST_ART = new Map<string, string>([
  ['peppered_deepbarb_catfish', '/ui/whetstorm/items/peppered_deepbarb_catfish.webp'],
  ['roast_hollowgill_sturgeon', '/ui/whetstorm/items/roast_hollowgill_sturgeon.webp'],
  ['evergarden_sunmelon_tart', '/ui/whetstorm/items/evergarden_sunmelon_tart.webp'],
  ['evergarden_harvest_platter', '/ui/whetstorm/items/evergarden_harvest_platter.webp'],
]);

export function foodLaterFishHarvestItemImageUrl(id: string): string | null {
  return FOOD_LATER_FISH_HARVEST_ART.get(id) ?? null;
}
