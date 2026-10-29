// Original paintings for discoveries in the heights and treasure hunts.
const PEAKS_DISCOVERY_DEED_ART = new Map<string, string>([
  ['chr_peaks_glimmer_cast', '/ui/whetstorm/deeds/chr_peaks_glimmer_cast.webp'],
  ['chr_peaks_moongate', '/ui/whetstorm/deeds/chr_peaks_moongate.webp'],
  ['chr_peaks_waking_witness', '/ui/whetstorm/deeds/chr_peaks_waking_witness.webp'],
  ['exp_clue_ten_caskets', '/ui/whetstorm/deeds/exp_clue_ten_caskets.webp'],
]);

export function peaksDiscoveryDeedImageUrl(id: string): string | null {
  return PEAKS_DISCOVERY_DEED_ART.get(id) ?? null;
}
