// Original conjured food and drink paintings in a closed map.
const FOOD_CONJURED_LATER_ART = new Map<string, string>([
  ['conjured_water3', '/ui/whetstorm/items/conjured_water3.webp'],
  ['conjured_water4', '/ui/whetstorm/items/conjured_water4.webp'],
  ['conjured_bread3', '/ui/whetstorm/items/conjured_bread3.webp'],
  ['conjured_bread4', '/ui/whetstorm/items/conjured_bread4.webp'],
]);

export function foodConjuredLaterItemImageUrl(id: string): string | null {
  return FOOD_CONJURED_LATER_ART.get(id) ?? null;
}
