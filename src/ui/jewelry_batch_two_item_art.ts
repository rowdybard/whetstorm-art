// Original paintings for the next crafted jewelry ladder.
const JEWELRY_BATCH_TWO_ITEM_ART = new Map<string, string>([
  ['etched_iron_loop', '/ui/whetstorm/items/etched_iron_loop.webp'],
  ['iron_link_choker', '/ui/whetstorm/items/iron_link_choker.webp'],
  ['weighted_thorium_band', '/ui/whetstorm/items/weighted_thorium_band.webp'],
  ['gleaming_thorium_loop', '/ui/whetstorm/items/gleaming_thorium_loop.webp'],
]);

export function jewelryBatchTwoItemImageUrl(id: string): string | null {
  return JEWELRY_BATCH_TWO_ITEM_ART.get(id) ?? null;
}
