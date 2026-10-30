// Original Whetstorm paintings for the four curator rank deeds.
const ART: ReadonlyMap<string, string> = new Map([
  ['col_reliquary_rank_2', '/ui/whetstorm/deeds/col_reliquary_rank_2.webp'],
  ['col_reliquary_rank_3', '/ui/whetstorm/deeds/col_reliquary_rank_3.webp'],
  ['col_reliquary_rank_4', '/ui/whetstorm/deeds/col_reliquary_rank_4.webp'],
  ['col_reliquary_rank_5', '/ui/whetstorm/deeds/col_reliquary_rank_5.webp'],
]);
export function curatorRankDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
