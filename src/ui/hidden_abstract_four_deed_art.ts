// Original abstract paintings for hidden deed identities.
const ART: ReadonlyMap<string, string> = new Map([
  ['hid_saul_footnote', '/ui/whetstorm/deeds/hid_saul_footnote.webp'],
  ['hid_fall_death', '/ui/whetstorm/deeds/hid_fall_death.webp'],
  ['hid_roll_hundred', '/ui/whetstorm/deeds/hid_roll_hundred.webp'],
  ['hid_bountiful_coffer', '/ui/whetstorm/deeds/hid_bountiful_coffer.webp'],
]);

export function hiddenAbstractFourDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
