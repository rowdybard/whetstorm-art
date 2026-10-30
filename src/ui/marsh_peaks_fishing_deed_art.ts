// Original paintings for marsh, mountain and fishing deeds.
const MARSH_PEAKS_FISHING_DEED_ART = new Map<string, string>([
  ['chr_marsh_hush_the_mending', '/ui/whetstorm/deeds/chr_marsh_hush_the_mending.webp'],
  ['chr_marsh_rares', '/ui/whetstorm/deeds/chr_marsh_rares.webp'],
  ['chr_peaks_sparring', '/ui/whetstorm/deeds/chr_peaks_sparring.webp'],
  ['col_glimmerfin', '/ui/whetstorm/deeds/col_glimmerfin.webp'],
]);

export function marshPeaksFishingDeedImageUrl(id: string): string | null {
  return MARSH_PEAKS_FISHING_DEED_ART.get(id) ?? null;
}
