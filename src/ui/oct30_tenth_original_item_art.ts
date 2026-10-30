// Original paintings for the tenth October 30 item batch.
const ART = new Map<string, string>([
  ['pearlward_aegis', '/ui/whetstorm/items/pearlward_aegis.webp'],
  ['bonewrought_bulwark', '/ui/whetstorm/items/bonewrought_bulwark.webp'],
  [
    'votive_ward_of_the_deathless_court',
    '/ui/whetstorm/items/votive_ward_of_the_deathless_court.webp',
  ],
  ['sunbone_ritual_hauberk', '/ui/whetstorm/items/sunbone_ritual_hauberk.webp'],
  ['pattern_evergarden_sunmelon_tart', '/ui/whetstorm/items/pattern_evergarden_sunmelon_tart.webp'],
  [
    'pattern_evergarden_harvest_platter',
    '/ui/whetstorm/items/pattern_evergarden_harvest_platter.webp',
  ],
  [
    'pattern_evergarden_braised_greens',
    '/ui/whetstorm/items/pattern_evergarden_braised_greens.webp',
  ],
  ['pattern_harvest_feast', '/ui/whetstorm/items/pattern_harvest_feast.webp'],
  ['heroic_bonewrought_bulwark', '/ui/whetstorm/items/bonewrought_bulwark.webp'],
  [
    'heroic_votive_ward_of_the_deathless_court',
    '/ui/whetstorm/items/votive_ward_of_the_deathless_court.webp',
  ],
]);

export function oct30TenthOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
