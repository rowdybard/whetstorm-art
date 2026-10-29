// Original paintings for crypt encounter challenges.
const CRYPT_CHALLENGE_DEED_ART = new Map<string, string>([
  ['dgn_morthen_flawless', '/ui/whetstorm/deeds/dgn_morthen_flawless.webp'],
  ['dgn_morthen_trio', '/ui/whetstorm/deeds/dgn_morthen_trio.webp'],
  ['dgn_olen_arc', '/ui/whetstorm/deeds/dgn_olen_arc.webp'],
]);

export function cryptChallengeDeedImageUrl(id: string): string | null {
  return CRYPT_CHALLENGE_DEED_ART.get(id) ?? null;
}
