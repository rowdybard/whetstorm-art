// Original paintings for Thornpeak chronicle deeds.
const THORNPEAK_CHRONICLE_DEED_ART = new Map<string, string>([
  ['chr_peaks_chapter_i', '/ui/whetstorm/deeds/chr_peaks_chapter_i.webp'],
  ['chr_peaks_chapter_ii', '/ui/whetstorm/deeds/chr_peaks_chapter_ii.webp'],
  ['chr_peaks_gatherer', '/ui/whetstorm/deeds/chr_peaks_gatherer.webp'],
  ['chr_peaks_rares', '/ui/whetstorm/deeds/chr_peaks_rares.webp'],
]);

export function thornpeakChronicleDeedImageUrl(id: string): string | null {
  return THORNPEAK_CHRONICLE_DEED_ART.get(id) ?? null;
}
