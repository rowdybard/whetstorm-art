// Original abstract paintings for hidden deed identities.
const ART: ReadonlyMap<string, string> = new Map([
  ['hid_saul_footnote', '/ui/whetstorm/deeds/hid_saul_footnote.webp'],
  ['hid_fall_death', '/ui/whetstorm/deeds/hid_fall_death.webp'],
  ['hid_roll_hundred', '/ui/whetstorm/deeds/hid_roll_hundred.webp'],
  ['hid_bountiful_coffer', '/ui/whetstorm/deeds/hid_bountiful_coffer.webp'],
  ['hid_keepers_toll_twice', '/ui/whetstorm/deeds/hid_keepers_toll_twice.webp'],
  ['hid_companion_save', '/ui/whetstorm/deeds/hid_companion_save.webp'],
  ['hid_codfather', '/ui/whetstorm/deeds/hid_codfather.webp'],
  ['hid_forgebreaker', '/ui/whetstorm/deeds/hid_forgebreaker.webp'],
]);

export function hiddenAbstractFourDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
