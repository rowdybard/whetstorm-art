// Original paintings for sanctum encounter challenges.
const SANCTUM_CHALLENGE_DEED_ART = new Map<string, string>([
  ['dgn_velkhar_bonewalkers', '/ui/whetstorm/deeds/dgn_velkhar_bonewalkers.webp'],
  ['dgn_korzul_flawless', '/ui/whetstorm/deeds/dgn_korzul_flawless.webp'],
  ['dgn_sanctum_speed', '/ui/whetstorm/deeds/dgn_sanctum_speed.webp'],
]);

export function sanctumChallengeDeedImageUrl(id: string): string | null {
  return SANCTUM_CHALLENGE_DEED_ART.get(id) ?? null;
}
