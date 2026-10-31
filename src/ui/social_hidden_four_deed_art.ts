// Original paintings for social and hidden deed identities.
const ART: ReadonlyMap<string, string> = new Map([
  ['soc_guild_founded', '/ui/whetstorm/deeds/soc_guild_founded.webp'],
  ['soc_gilded_strongbox', '/ui/whetstorm/deeds/soc_gilded_strongbox.webp'],
  ['soc_wyrms_hoard', '/ui/whetstorm/deeds/soc_wyrms_hoard.webp'],
  ['hid_gilded_tour', '/ui/whetstorm/deeds/hid_gilded_tour.webp'],
]);

export function socialHiddenFourDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
