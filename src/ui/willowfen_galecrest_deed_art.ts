// Original paintings for Willowfen and Galecrest gathering and fishing deeds.
const WILLOWFEN_GALECREST_DEED_ART = new Map<string, string>([
  ['chr_willowfen_first_cast', '/ui/whetstorm/deeds/chr_willowfen_first_cast.webp'],
  ['chr_willowfen_gatherer', '/ui/whetstorm/deeds/chr_willowfen_gatherer.webp'],
  ['chr_galecrest_first_cast', '/ui/whetstorm/deeds/chr_galecrest_first_cast.webp'],
  ['chr_galecrest_gatherer', '/ui/whetstorm/deeds/chr_galecrest_gatherer.webp'],
]);

export function willowfenGalecrestDeedImageUrl(id: string): string | null {
  return WILLOWFEN_GALECREST_DEED_ART.get(id) ?? null;
}
