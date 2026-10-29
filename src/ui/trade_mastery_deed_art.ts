// Original paintings for gathering proficiency milestones.
const TRADE_MASTERY_DEED_ART = new Map<string, string>([
  ['prog_mining_100', '/ui/whetstorm/deeds/prog_mining_100.webp'],
  ['prog_logging_100', '/ui/whetstorm/deeds/prog_logging_100.webp'],
  ['prog_herbalism_100', '/ui/whetstorm/deeds/prog_herbalism_100.webp'],
]);

export function tradeMasteryDeedImageUrl(id: string): string | null {
  return TRADE_MASTERY_DEED_ART.get(id) ?? null;
}
