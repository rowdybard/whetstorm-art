// Original paintings for conditional relic deeds.
const ART: ReadonlyMap<string, string> = new Map([
  ['feat_brightwood_relic', '/ui/whetstorm/deeds/feat_brightwood_relic.webp'],
  ['col_reliquary_complete', '/ui/whetstorm/deeds/col_reliquary_complete.webp'],
]);

export function conditionalRelicDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
