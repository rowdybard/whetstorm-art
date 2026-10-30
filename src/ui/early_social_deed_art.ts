// Original paintings for early social deeds.
const EARLY_SOCIAL_DEED_ART = new Map<string, string>([
  ['soc_first_party', '/ui/whetstorm/deeds/soc_first_party.webp'],
  ['soc_first_trade', '/ui/whetstorm/deeds/soc_first_trade.webp'],
  ['soc_first_salvage', '/ui/whetstorm/deeds/soc_first_salvage.webp'],
  ['soc_meet_bursar', '/ui/whetstorm/deeds/soc_meet_bursar.webp'],
]);

export function earlySocialDeedImageUrl(id: string): string | null {
  return EARLY_SOCIAL_DEED_ART.get(id) ?? null;
}
