// Original paintings for delve challenge deeds.
const DELVE_CHALLENGE_DEED_ART = new Map<string, string>([
  ['dlv_clears_50', '/ui/whetstorm/deeds/dlv_clears_50.webp'],
  ['dlv_tumbler_premium', '/ui/whetstorm/deeds/dlv_tumbler_premium.webp'],
  ['dlv_rite_flawless', '/ui/whetstorm/deeds/dlv_rite_flawless.webp'],
]);

export function delveChallengeDeedImageUrl(id: string): string | null {
  return DELVE_CHALLENGE_DEED_ART.get(id) ?? null;
}
