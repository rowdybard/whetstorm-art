// Original paintings for rift, legendary crafting, and harvest deeds.
const RIFT_HARVEST_DEED_ART = new Map<string, string>([
  ['dgn_rift', '/ui/whetstorm/deeds/dgn_rift.webp'],
  ['dgn_rift_s_rank', '/ui/whetstorm/deeds/dgn_rift_s_rank.webp'],
  ['prog_legendmaker', '/ui/whetstorm/deeds/prog_legendmaker.webp'],
  ['col_golden_harvest', '/ui/whetstorm/deeds/col_golden_harvest.webp'],
]);

export function riftHarvestDeedImageUrl(id: string): string | null {
  return RIFT_HARVEST_DEED_ART.get(id) ?? null;
}
