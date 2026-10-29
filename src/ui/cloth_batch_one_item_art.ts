// Original paintings for early cloth armor.
const CLOTH_BATCH_ONE_ITEM_ART = new Map<string, string>([
  ['acolytes_circlet', '/ui/whetstorm/items/acolytes_circlet.webp'],
  ['embroidered_mantle', '/ui/whetstorm/items/embroidered_mantle.webp'],
  ['silk_sash', '/ui/whetstorm/items/silk_sash.webp'],
  ['roughspun_gloves', '/ui/whetstorm/items/roughspun_gloves.webp'],
]);

export function clothBatchOneItemImageUrl(id: string): string | null {
  return CLOTH_BATCH_ONE_ITEM_ART.get(id) ?? null;
}
