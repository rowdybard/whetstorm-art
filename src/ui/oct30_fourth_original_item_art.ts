// Original paintings for the fourth October 30 item batch.
const OCT30_FOURTH_ORIGINAL_ITEMS = new Map<string, string>([
  ['drownstep_sabatons', '/ui/whetstorm/items/drownstep_sabatons.webp'],
  ['emberforge_gauntlets', '/ui/whetstorm/items/emberforge_gauntlets.webp'],
  ['graskbreaker_girdle', '/ui/whetstorm/items/graskbreaker_girdle.webp'],
  ['ysols_pearl_greaves', '/ui/whetstorm/items/ysols_pearl_greaves.webp'],
  ['wreckfield_flotsam_crate', '/ui/whetstorm/items/wreckfield_flotsam_crate.webp'],
  ['pearlwake_cargo_crate', '/ui/whetstorm/items/pearlwake_cargo_crate.webp'],
  ['confection_game_box', '/ui/whetstorm/items/confection_game_box.webp'],
  ['gloamfield_nightbloom', '/ui/whetstorm/items/gloamfield_nightbloom.webp'],
  ['heroic_ysols_pearl_greaves', '/ui/whetstorm/items/ysols_pearl_greaves.webp'],
]);

export function oct30FourthOriginalItemImageUrl(id: string): string | null {
  return OCT30_FOURTH_ORIGINAL_ITEMS.get(id) ?? null;
}
