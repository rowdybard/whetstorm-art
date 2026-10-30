// Individually painted original items from the October 30 art batches.
const OCT30_ORIGINAL_ITEMS = new Map<string, string>([
  ['wildheart_tuskblade', '/ui/whetstorm/items/wildheart_tuskblade.webp'],
  ['wildheart_hexwood_staff', '/ui/whetstorm/items/wildheart_hexwood_staff.webp'],
  ['wildheart_fangknife', '/ui/whetstorm/items/wildheart_fangknife.webp'],
  ['heroic_wildheart_tuskblade', '/ui/whetstorm/items/wildheart_tuskblade.webp'],
  ['heroic_wildheart_hexwood_staff', '/ui/whetstorm/items/wildheart_hexwood_staff.webp'],
  ['heroic_wildheart_fangknife', '/ui/whetstorm/items/wildheart_fangknife.webp'],
  ['bristlehide_spaulders', '/ui/whetstorm/items/bristlehide_spaulders.webp'],
  ['wanderers_chestguard', '/ui/whetstorm/items/wanderers_chestguard.webp'],
  ['forgefathers_ember', '/ui/whetstorm/items/forgefathers_ember.webp'],
  ['gyrelens_array', '/ui/whetstorm/items/gyrelens_array.webp'],
  ['voidbound_grimoire', '/ui/whetstorm/items/voidbound_grimoire.webp'],
  ['copperlens_ocular', '/ui/whetstorm/items/copperlens_ocular.webp'],
  ['wraithfire_orb', '/ui/whetstorm/items/wraithfire_orb.webp'],
  ['evergarden_statue_rubbing', '/ui/whetstorm/items/evergarden_statue_rubbing.webp'],
  ['vigil_star_chart', '/ui/whetstorm/items/vigil_star_chart.webp'],
  ['sunken_offering_bowl', '/ui/whetstorm/items/sunken_offering_bowl.webp'],
  ['hollow_sealstone', '/ui/whetstorm/items/hollow_sealstone.webp'],
]);

export function oct30OriginalItemImageUrl(id: string): string | null {
  return OCT30_ORIGINAL_ITEMS.get(id) ?? null;
}
