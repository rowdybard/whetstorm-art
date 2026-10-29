// Original paintings for current cloth armor.
const CLOTH_BATCH_TWO_ITEM_ART = new Map<string, string>([
  ['sableweb_cord', '/ui/whetstorm/items/sableweb_cord.webp'],
  ['caravan_quilted_vest', '/ui/whetstorm/items/caravan_quilted_vest.webp'],
  ['pilgrims_leggings', '/ui/whetstorm/items/pilgrims_leggings.webp'],
  ['sunspun_handwraps', '/ui/whetstorm/items/sunspun_handwraps.webp'],
]);

export function clothBatchTwoItemImageUrl(id: string): string | null {
  return CLOTH_BATCH_TWO_ITEM_ART.get(id) ?? null;
}
