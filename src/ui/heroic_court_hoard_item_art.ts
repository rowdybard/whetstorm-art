// Original paintings for heroic court armor, hoard offhands, and quest objects.
const HEROIC_COURT_HOARD_ITEM_ART = new Map<string, string>([
  ['sash_of_the_sunken_court', '/ui/whetstorm/items/sash_of_the_sunken_court.webp'],
  ['sunken_court_mantle', '/ui/whetstorm/items/sunken_court_mantle.webp'],
  ['tidewoven_trousers', '/ui/whetstorm/items/tidewoven_trousers.webp'],
  ['choirmothers_casque', '/ui/whetstorm/items/choirmothers_casque.webp'],
  ['orb_collapsing_void', '/ui/whetstorm/items/orb_collapsing_void.webp'],
  ['glacier_hewn_bulwark', '/ui/whetstorm/items/glacier_hewn_bulwark.webp'],
  ['storm_tuned_buckler', '/ui/whetstorm/items/storm_tuned_buckler.webp'],
  ['chalice_of_living_tides', '/ui/whetstorm/items/chalice_of_living_tides.webp'],
  ['scorched_supply_crate', '/ui/whetstorm/items/scorched_supply_crate.webp'],
  ['wyrmwatch_warning_banner', '/ui/whetstorm/items/wyrmwatch_warning_banner.webp'],
  ['gullhaven_watchbell', '/ui/whetstorm/items/gullhaven_watchbell.webp'],
  ['hearth_ember_cache', '/ui/whetstorm/items/hearth_ember_cache.webp'],
]);

export function heroicCourtHoardItemImageUrl(id: string): string | null {
  return HEROIC_COURT_HOARD_ITEM_ART.get(id) ?? null;
}
