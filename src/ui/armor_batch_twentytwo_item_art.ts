// Original paintings for cloth and leather armor.
const ARMOR_BATCH_TWENTYTWO_ITEM_ART = new Map<string, string>([
  ['mistveil_cord', '/ui/whetstorm/items/mistveil_cord.webp'],
  ['mistveil_grips', '/ui/whetstorm/items/mistveil_grips.webp'],
  ['wardweave_cowl', '/ui/whetstorm/items/wardweave_cowl.webp'],
  ['duskhide_wraps', '/ui/whetstorm/items/duskhide_wraps.webp'],
]);

export function armorBatchTwentytwoItemImageUrl(id: string): string | null {
  return ARMOR_BATCH_TWENTYTWO_ITEM_ART.get(id) ?? null;
}
