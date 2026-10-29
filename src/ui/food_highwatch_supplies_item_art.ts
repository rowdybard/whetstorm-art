// Original Highwatch food and drink paintings in a closed map.
const FOOD_HIGHWATCH_SUPPLIES_ART = new Map<string, string>([
  ['highwatch_barley_bannock', '/ui/whetstorm/items/highwatch_barley_bannock.webp'],
  ['highwatch_gourd_soup', '/ui/whetstorm/items/highwatch_gourd_soup.webp'],
  ['trail_hardtack', '/ui/whetstorm/items/trail_hardtack.webp'],
  ['meltwater_flask', '/ui/whetstorm/items/meltwater_flask.webp'],
]);

export function foodHighwatchSuppliesItemImageUrl(id: string): string | null {
  return FOOD_HIGHWATCH_SUPPLIES_ART.get(id) ?? null;
}
