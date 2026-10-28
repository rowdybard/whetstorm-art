// Original paintings for four early marsh items.
const MARSH_BATCH_EIGHTEEN_ITEM_ART = new Map<string, string>([
  ['rough_hide', '/ui/whetstorm/items/rough_hide.webp'],
  ['knight_commanders_greaves', '/ui/whetstorm/items/knight_commanders_greaves.webp'],
  ['elixir_of_the_bear', '/ui/whetstorm/items/elixir_of_the_bear.webp'],
  ['wayfarers_backpack', '/ui/whetstorm/items/wayfarers_backpack.webp'],
]);

export function marshBatchEighteenItemImageUrl(id: string): string | null {
  return MARSH_BATCH_EIGHTEEN_ITEM_ART.get(id) ?? null;
}
