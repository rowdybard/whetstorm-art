// Original paintings for flooded encounter challenges.
const FLOODED_CHALLENGE_DEED_ART = new Map<string, string>([
  ['dgn_vael_thralls', '/ui/whetstorm/deeds/dgn_vael_thralls.webp'],
  ['dgn_ysolei_moonspawn', '/ui/whetstorm/deeds/dgn_ysolei_moonspawn.webp'],
  ['dgn_ysolei_flawless', '/ui/whetstorm/deeds/dgn_ysolei_flawless.webp'],
]);

export function floodedChallengeDeedImageUrl(id: string): string | null {
  return FLOODED_CHALLENGE_DEED_ART.get(id) ?? null;
}
