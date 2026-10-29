// Original paintings for quest collection fibers.
const QUEST_FIBER_DROPS_ART = new Map<string, string>([
  ['moonfleece_tuft', '/ui/whetstorm/items/moonfleece_tuft.webp'],
  ['widowsilk_skein', '/ui/whetstorm/items/widowsilk_skein.webp'],
  ['canopy_silk_hank', '/ui/whetstorm/items/canopy_silk_hank.webp'],
]);

export function questFiberDropsItemImageUrl(id: string): string | null {
  return QUEST_FIBER_DROPS_ART.get(id) ?? null;
}
