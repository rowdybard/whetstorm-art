// Original paintings for advanced progression deeds.
const ASCENDANT_DEED_ART = new Map<string, string>([
  ['prog_mythic', '/ui/whetstorm/deeds/prog_mythic.webp'],
  ['prog_eternal', '/ui/whetstorm/deeds/prog_eternal.webp'],
  ['prog_full_build', '/ui/whetstorm/deeds/prog_full_build.webp'],
]);

export function ascendantDeedImageUrl(id: string): string | null {
  return ASCENDANT_DEED_ART.get(id) ?? null;
}
