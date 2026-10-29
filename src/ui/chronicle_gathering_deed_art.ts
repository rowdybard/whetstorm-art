// Original paintings for gathering and harvest chronicle deeds.
const CHRONICLE_GATHERING_DEED_ART = new Map<string, string>([
  ['chr_vale_gatherer', '/ui/whetstorm/deeds/chr_vale_gatherer.webp'],
  ['chr_vale_first_harvest', '/ui/whetstorm/deeds/chr_vale_first_harvest.webp'],
  ['chr_marsh_first_harvest', '/ui/whetstorm/deeds/chr_marsh_first_harvest.webp'],
  ['chr_peaks_first_harvest', '/ui/whetstorm/deeds/chr_peaks_first_harvest.webp'],
]);

export function chronicleGatheringDeedImageUrl(id: string): string | null {
  return CHRONICLE_GATHERING_DEED_ART.get(id) ?? null;
}
