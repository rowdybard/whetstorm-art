// Original crests for social and commerce milestones.
const ART: ReadonlyMap<string, string> = new Map([
  ['soc_steady_custom', '/ui/whetstorm/deeds/soc_steady_custom.webp'],
  ['soc_market_magnate', '/ui/whetstorm/deeds/soc_market_magnate.webp'],
  ['soc_by_ravens_wing', '/ui/whetstorm/deeds/soc_by_ravens_wing.webp'],
  ['soc_salvage_50', '/ui/whetstorm/deeds/soc_salvage_50.webp'],
]);

export function socialCommerceDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
