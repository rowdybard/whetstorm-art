// Original paintings for catchable raw fish.
const FISHING_RAW_CATCH_ART = new Map<string, string>([
  ['raw_bog_eel', '/ui/whetstorm/items/raw_bog_eel.webp'],
  ['raw_frostgill_trout', '/ui/whetstorm/items/raw_frostgill_trout.webp'],
  ['raw_stonescale_carp', '/ui/whetstorm/items/raw_stonescale_carp.webp'],
]);

export function fishingRawCatchItemImageUrl(id: string): string | null {
  return FISHING_RAW_CATCH_ART.get(id) ?? null;
}
