// Original paintings for raid encounter challenges.
const RAID_CHALLENGE_DEED_ART = new Map<string, string>([
  ['dgn_nythraxis_gravebreaker', '/ui/whetstorm/deeds/dgn_nythraxis_gravebreaker.webp'],
  ['dgn_nythraxis_wardens', '/ui/whetstorm/deeds/dgn_nythraxis_wardens.webp'],
  ['dgn_nythraxis_deathless', '/ui/whetstorm/deeds/dgn_nythraxis_deathless.webp'],
]);

export function raidChallengeDeedImageUrl(id: string): string | null {
  return RAID_CHALLENGE_DEED_ART.get(id) ?? null;
}
