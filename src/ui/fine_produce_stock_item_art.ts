// Original paintings for fine produce and cooking stock.
const FINE_PRODUCE_STOCK_ART = new Map<string, string>([
  ['fine_gilded_sunmelon', '/ui/whetstorm/items/fine_gilded_sunmelon.webp'],
  ['fine_evergarden_greens', '/ui/whetstorm/items/fine_evergarden_greens.webp'],
  ['seasoned_stock', '/ui/whetstorm/items/seasoned_stock.webp'],
]);

export function fineProduceStockItemImageUrl(id: string): string | null {
  return FINE_PRODUCE_STOCK_ART.get(id) ?? null;
}
