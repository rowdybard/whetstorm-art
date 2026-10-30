// Original paintings for Amberfall and Evergarden gathering deeds.
const AMBERFALL_EVERGARDEN_DEED_ART = new Map<string, string>([
  ['chr_amberfall_first_cast', '/ui/whetstorm/deeds/chr_amberfall_first_cast.webp'],
  ['chr_amberfall_gatherer', '/ui/whetstorm/deeds/chr_amberfall_gatherer.webp'],
  ['chr_evergarden_first_cast', '/ui/whetstorm/deeds/chr_evergarden_first_cast.webp'],
  ['chr_evergarden_first_harvest', '/ui/whetstorm/deeds/chr_evergarden_first_harvest.webp'],
]);

export function amberfallEvergardenDeedImageUrl(id: string): string | null {
  return AMBERFALL_EVERGARDEN_DEED_ART.get(id) ?? null;
}
