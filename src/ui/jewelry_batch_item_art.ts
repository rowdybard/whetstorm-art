// Original paintings for early crafted jewelry.
const JEWELRY_BATCH_ITEM_ART = new Map<string, string>([
  ['hammered_copper_band', '/ui/whetstorm/items/hammered_copper_band.webp'],
  ['polished_copper_loop', '/ui/whetstorm/items/polished_copper_loop.webp'],
  ['coiled_copper_torc', '/ui/whetstorm/items/coiled_copper_torc.webp'],
  ['riveted_iron_signet', '/ui/whetstorm/items/riveted_iron_signet.webp'],
]);

export function jewelryBatchItemImageUrl(id: string): string | null {
  return JEWELRY_BATCH_ITEM_ART.get(id) ?? null;
}
