// Original paintings for the fifth October 30 item batch.
const OCT30_FIFTH_ORIGINAL_ITEMS = new Map<string, string>([
  ['moonshroud_breastplate', '/ui/whetstorm/items/moonshroud_breastplate.webp'],
  ['broodmother_carapace', '/ui/whetstorm/items/broodmother_carapace.webp'],
  ['cryptbloom_shoulderguards', '/ui/whetstorm/items/cryptbloom_shoulderguards.webp'],
  ['grovewardens_grips', '/ui/whetstorm/items/grovewardens_grips.webp'],
  ['the_codfather', '/ui/whetstorm/items/the_codfather.webp'],
  ['unknown_alien_weaponry', '/ui/whetstorm/items/unknown_alien_weaponry.webp'],
  ['heroic_moonshroud_breastplate', '/ui/whetstorm/items/moonshroud_breastplate.webp'],
  ['heroic_grovewardens_grips', '/ui/whetstorm/items/grovewardens_grips.webp'],
]);

export function oct30FifthOriginalItemImageUrl(id: string): string | null {
  return OCT30_FIFTH_ORIGINAL_ITEMS.get(id) ?? null;
}
