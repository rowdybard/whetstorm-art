// Original paintings for the twelfth October 30 item batch.
const ART = new Map<string, string>([
  ['mawscale_pauldrons', '/ui/whetstorm/items/mawscale_pauldrons.webp'],
  ['fountain_court_mantle', '/ui/whetstorm/items/fountain_court_mantle.webp'],
  ['mantle_of_the_unbroken_shore', '/ui/whetstorm/items/mantle_of_the_unbroken_shore.webp'],
  ['wreck_wardens_mantle', '/ui/whetstorm/items/wreck_wardens_mantle.webp'],
]);

export function oct30TwelfthOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
