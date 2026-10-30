// Original paintings for the thirteenth October 30 item batch.
const ART = new Map<string, string>([
  ['barrowshade_mantle', '/ui/whetstorm/items/barrowshade_mantle.webp'],
  ['mantle_of_the_unhorsed', '/ui/whetstorm/items/mantle_of_the_unhorsed.webp'],
  ['sunbone_ritual_sarong', '/ui/whetstorm/items/sunbone_ritual_sarong.webp'],
  ['lilybed_mantle', '/ui/whetstorm/items/lilybed_mantle.webp'],
  ['pattern_spiritweld_girdle', '/ui/whetstorm/items/pattern_spiritweld_girdle.webp'],
  ['pattern_forgefold_legguards', '/ui/whetstorm/items/pattern_forgefold_legguards.webp'],
  ['pattern_wardspeaker_sabatons', '/ui/whetstorm/items/pattern_wardspeaker_sabatons.webp'],
  ['pattern_briarstep_jerkin', '/ui/whetstorm/items/pattern_briarstep_jerkin.webp'],
]);

export function oct30ThirteenthOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
