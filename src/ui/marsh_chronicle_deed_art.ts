// Original paintings for Mirefen chronicle deeds.
const MARSH_CHRONICLE_DEED_ART = new Map<string, string>([
  ['chr_marsh_chapter_i', '/ui/whetstorm/deeds/chr_marsh_chapter_i.webp'],
  ['chr_marsh_chapter_ii', '/ui/whetstorm/deeds/chr_marsh_chapter_ii.webp'],
  ['chr_marsh_chapter_iii', '/ui/whetstorm/deeds/chr_marsh_chapter_iii.webp'],
  ['chr_marsh_first_cast', '/ui/whetstorm/deeds/chr_marsh_first_cast.webp'],
]);

export function marshChronicleDeedImageUrl(id: string): string | null {
  return MARSH_CHRONICLE_DEED_ART.get(id) ?? null;
}
