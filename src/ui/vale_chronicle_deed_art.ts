// Original paintings for the Vale chronicle and its wolf challenge.
const VALE_CHRONICLE_DEED_ART = new Map<string, string>([
  ['chr_vale_chapter_i', '/ui/whetstorm/deeds/chr_vale_chapter_i.webp'],
  ['chr_vale_chapter_ii', '/ui/whetstorm/deeds/chr_vale_chapter_ii.webp'],
  ['chr_vale_chapter_iii', '/ui/whetstorm/deeds/chr_vale_chapter_iii.webp'],
  ['chr_vale_packbreaker', '/ui/whetstorm/deeds/chr_vale_packbreaker.webp'],
]);

export function valeChronicleDeedImageUrl(id: string): string | null {
  return VALE_CHRONICLE_DEED_ART.get(id) ?? null;
}
