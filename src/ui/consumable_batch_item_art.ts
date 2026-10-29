// Original paintings for early consumable items.
const CONSUMABLE_BATCH_ART = new Map<string, string>([
  ['mana_potion', '/ui/whetstorm/items/mana_potion.webp'],
  ['conjured_water', '/ui/whetstorm/items/conjured_water.webp'],
  ['conjured_water2', '/ui/whetstorm/items/conjured_water2.webp'],
  ['conjured_bread', '/ui/whetstorm/items/conjured_bread.webp'],
]);

export function consumableBatchItemImageUrl(id: string): string | null {
  return CONSUMABLE_BATCH_ART.get(id) ?? null;
}
