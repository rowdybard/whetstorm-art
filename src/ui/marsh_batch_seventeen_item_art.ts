// Original paintings for four early marsh encounter rewards.
const MARSH_BATCH_SEVENTEEN_ITEM_ART = new Map<string, string>([
  ['tidereaver_gaff', '/ui/whetstorm/items/tidereaver_gaff.webp'],
  ['sloomtooth_tidefang', '/ui/whetstorm/items/sloomtooth_tidefang.webp'],
  ['drowned_tide_scepter', '/ui/whetstorm/items/drowned_tide_scepter.webp'],
  ['nhalias_funeral_wraps', '/ui/whetstorm/items/nhalias_funeral_wraps.webp'],
]);

export function marshBatchSeventeenItemImageUrl(id: string): string | null {
  return MARSH_BATCH_SEVENTEEN_ITEM_ART.get(id) ?? null;
}
