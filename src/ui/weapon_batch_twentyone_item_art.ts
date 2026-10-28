// Original paintings for Mirefen delve and vendor weapons.
const WEAPON_BATCH_TWENTYONE_ITEM_ART = new Map<string, string>([
  ['mirejaw_fang_knife', '/ui/whetstorm/items/mirejaw_fang_knife.webp'],
  ['corpse_candle_focus', '/ui/whetstorm/items/corpse_candle_focus.webp'],
  ['nhalias_litany_rod', '/ui/whetstorm/items/nhalias_litany_rod.webp'],
  ['drowned_choir_fang', '/ui/whetstorm/items/drowned_choir_fang.webp'],
]);

export function weaponBatchTwentyoneItemImageUrl(id: string): string | null {
  return WEAPON_BATCH_TWENTYONE_ITEM_ART.get(id) ?? null;
}
