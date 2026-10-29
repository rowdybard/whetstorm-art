// Original cooking paintings in a closed map.
const FOOD_COOKING_LATER_ART = new Map<string, string>([
  ['frostgill_chowder', '/ui/whetstorm/items/frostgill_chowder.webp'],
  ['silvered_carp_supper', '/ui/whetstorm/items/silvered_carp_supper.webp'],
  ['anglers_feast_platter', '/ui/whetstorm/items/anglers_feast_platter.webp'],
  ['marlows_grand_roast', '/ui/whetstorm/items/marlows_grand_roast.webp'],
]);

export function foodCookingLaterItemImageUrl(id: string): string | null {
  return FOOD_COOKING_LATER_ART.get(id) ?? null;
}
