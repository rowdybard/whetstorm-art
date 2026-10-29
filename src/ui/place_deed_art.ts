// Original paintings for places and journeys.
const PLACE_DEED_ART = new Map<string, string>([
  ['chr_marsh_gatherer', '/ui/whetstorm/deeds/chr_marsh_gatherer.webp'],
  ['exp_the_last_keep', '/ui/whetstorm/deeds/exp_the_last_keep.webp'],
  ['exp_dawnhold_castle', '/ui/whetstorm/deeds/exp_dawnhold_castle.webp'],
  ['exp_windrider_slalom', '/ui/whetstorm/deeds/exp_windrider_slalom.webp'],
]);

export function placeDeedImageUrl(id: string): string | null {
  return PLACE_DEED_ART.get(id) ?? null;
}
