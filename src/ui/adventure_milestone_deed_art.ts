// Original paintings for adventure milestone deeds.
const ADVENTURE_MILESTONE_DEED_ART = new Map<string, string>([
  ['dlv_nhalia_bells', '/ui/whetstorm/deeds/dlv_nhalia_bells.webp'],
  ['soc_full_house', '/ui/whetstorm/deeds/soc_full_house.webp'],
  ['feat_book_complete', '/ui/whetstorm/deeds/feat_book_complete.webp'],
  ['dgn_nythraxis_crypt', '/ui/whetstorm/deeds/dgn_nythraxis_crypt.webp'],
]);

export function adventureMilestoneDeedImageUrl(id: string): string | null {
  return ADVENTURE_MILESTONE_DEED_ART.get(id) ?? null;
}
