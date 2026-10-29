// Original paintings for early bags and fishing catches.
const BAGS_FISH_ITEM_ART = new Map<string, string>([
  ['linen_pouch', '/ui/whetstorm/items/linen_pouch.webp'],
  ['travelers_knapsack', '/ui/whetstorm/items/travelers_knapsack.webp'],
  ['raw_mirror_trout', '/ui/whetstorm/items/raw_mirror_trout.webp'],
  ['raw_marsh_pike', '/ui/whetstorm/items/raw_marsh_pike.webp'],
]);

export function bagsFishItemImageUrl(id: string): string | null {
  return BAGS_FISH_ITEM_ART.get(id) ?? null;
}
