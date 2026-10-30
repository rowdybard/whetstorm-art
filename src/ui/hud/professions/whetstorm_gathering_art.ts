// Original Whetstorm gathering profession paintings, keyed by exact identity.
const GATHERING_PROFESSION_ART: ReadonlyMap<string, string> = new Map([
  ['gather_farming', '/ui/whetstorm/professions/gather_farming.webp'],
  ['gather_fishing', '/ui/whetstorm/professions/gather_fishing.webp'],
  ['gather_herbalism', '/ui/whetstorm/professions/gather_herbalism.webp'],
  ['gather_logging', '/ui/whetstorm/professions/gather_logging.webp'],
  ['gather_mining', '/ui/whetstorm/professions/gather_mining.webp'],
]);

export function whetstormGatheringProfessionImageUrl(id: string): string | null {
  return GATHERING_PROFESSION_ART.get(id) ?? null;
}
