// Original paintings for later catchable raw fish.
const FISHING_LATER_CATCH_ART = new Map<string, string>([
  ['raw_deepbarb_catfish', '/ui/whetstorm/items/raw_deepbarb_catfish.webp'],
  ['raw_hollowgill_sturgeon', '/ui/whetstorm/items/raw_hollowgill_sturgeon.webp'],
  ['raw_stillmere_salmon', '/ui/whetstorm/items/raw_stillmere_salmon.webp'],
]);

export function fishingLaterCatchItemImageUrl(id: string): string | null {
  return FISHING_LATER_CATCH_ART.get(id) ?? null;
}
