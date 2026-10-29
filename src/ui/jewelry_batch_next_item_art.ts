// Individually painted original Whetstorm jewelry, mapped only to live item IDs.
const JEWELRY_BATCH_NEXT = new Map<string, string>([
  ['mother_of_pearl', '/ui/whetstorm/items/mother_of_pearl.webp'],
  ['tidewatchers_locket', '/ui/whetstorm/items/tidewatchers_locket.webp'],
  ['order_prayer_beads', '/ui/whetstorm/items/order_prayer_beads.webp'],
  ['rift_watchers_band', '/ui/whetstorm/items/rift_watchers_band.webp'],
]);

export function jewelryBatchNextItemImageUrl(id: string): string | null {
  return JEWELRY_BATCH_NEXT.get(id) ?? null;
}
