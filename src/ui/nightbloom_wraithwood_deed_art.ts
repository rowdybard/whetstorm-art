// Original paintings for Nightbloom and Wraithwood gathering deeds.
const NIGHTBLOOM_WRAITHWOOD_DEED_ART = new Map<string, string>([
  ['chr_nightbloom_first_cast', '/ui/whetstorm/deeds/chr_nightbloom_first_cast.webp'],
  ['chr_nightbloom_gatherer', '/ui/whetstorm/deeds/chr_nightbloom_gatherer.webp'],
  ['chr_wraithwood_first_cast', '/ui/whetstorm/deeds/chr_wraithwood_first_cast.webp'],
  ['chr_wraithwood_gatherer', '/ui/whetstorm/deeds/chr_wraithwood_gatherer.webp'],
]);

export function nightbloomWraithwoodDeedImageUrl(id: string): string | null {
  return NIGHTBLOOM_WRAITHWOOD_DEED_ART.get(id) ?? null;
}
