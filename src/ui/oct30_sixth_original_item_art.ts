// Original paintings for the sixth October 30 item batch.
const OCT30_SIXTH_ORIGINAL_ITEMS = new Map<string, string>([
  ['moonshroud_tunic', '/ui/whetstorm/items/moonshroud_tunic.webp'],
  ['selthes_seastriders', '/ui/whetstorm/items/selthes_seastriders.webp'],
  ['stormscale_treads', '/ui/whetstorm/items/stormscale_treads.webp'],
  ['verdant_walkers', '/ui/whetstorm/items/verdant_walkers.webp'],
  ['sunspun_vestments', '/ui/whetstorm/items/sunspun_vestments.webp'],
  ['sunspun_leggings', '/ui/whetstorm/items/sunspun_leggings.webp'],
  ['reinforced_armor_kit', '/ui/whetstorm/items/reinforced_armor_kit.webp'],
  ['dense_sharpening_stone', '/ui/whetstorm/items/dense_sharpening_stone.webp'],
  ['heroic_moonshroud_tunic', '/ui/whetstorm/items/moonshroud_tunic.webp'],
  ['heroic_selthes_seastriders', '/ui/whetstorm/items/selthes_seastriders.webp'],
  ['heroic_verdant_walkers', '/ui/whetstorm/items/verdant_walkers.webp'],
]);

export function oct30SixthOriginalItemImageUrl(id: string): string | null {
  return OCT30_SIXTH_ORIGINAL_ITEMS.get(id) ?? null;
}
