// Original paintings for four early-zone armor items.
const ARMOR_BATCH_NINE_ITEM_ART = new Map<string, string>([
  ['riveted_copper_girdle', '/ui/whetstorm/items/riveted_copper_girdle.webp'],
  ['coppermail_sabatons', '/ui/whetstorm/items/coppermail_sabatons.webp'],
  ['coppermail_gauntlets', '/ui/whetstorm/items/coppermail_gauntlets.webp'],
  ['homespun_hood', '/ui/whetstorm/items/homespun_hood.webp'],
]);

export function armorBatchNineItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_NINE_ITEM_ART.get(id) ?? null;
}
