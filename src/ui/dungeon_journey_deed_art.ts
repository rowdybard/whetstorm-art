// Original paintings for dungeon journey deeds.
const DUNGEON_JOURNEY_DEED_ART = new Map<string, string>([
  ['dgn_gravewyrm_sanctum', '/ui/whetstorm/deeds/dgn_gravewyrm_sanctum.webp'],
  ['dgn_nythraxis', '/ui/whetstorm/deeds/dgn_nythraxis.webp'],
  ['dgn_thornpeak_rounds', '/ui/whetstorm/deeds/dgn_thornpeak_rounds.webp'],
]);

export function dungeonJourneyDeedImageUrl(id: string): string | null {
  return DUNGEON_JOURNEY_DEED_ART.get(id) ?? null;
}
