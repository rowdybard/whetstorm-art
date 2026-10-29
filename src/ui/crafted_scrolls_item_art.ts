// Original paintings for crafted scroll items.
const CRAFTED_SCROLLS_ART = new Map<string, string>([
  ['silverleaf_scroll', '/ui/whetstorm/items/silverleaf_scroll.webp'],
  ['goldleaf_scroll', '/ui/whetstorm/items/goldleaf_scroll.webp'],
  ['sunpetal_scroll', '/ui/whetstorm/items/sunpetal_scroll.webp'],
]);

export function craftedScrollsItemImageUrl(id: string): string | null {
  return CRAFTED_SCROLLS_ART.get(id) ?? null;
}
