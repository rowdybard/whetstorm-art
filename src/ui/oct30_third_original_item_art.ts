// Original paintings for the third October 30 item batch.
const OCT30_THIRD_ORIGINAL_ITEMS = new Map<string, string>([
  ['fanglords_beastspear', '/ui/whetstorm/items/fanglords_beastspear.webp'],
  ['deathless_heartwood', '/ui/whetstorm/items/deathless_heartwood.webp'],
  ['kingsbane_last_oath', '/ui/whetstorm/items/kingsbane_last_oath.webp'],
  ['wyrmshadow_legguards', '/ui/whetstorm/items/wyrmshadow_legguards.webp'],
  ['wyrmshadow_talongrips', '/ui/whetstorm/items/wyrmshadow_talongrips.webp'],
  ['shardfang_grips', '/ui/whetstorm/items/shardfang_grips.webp'],
  ['thornpeak_wildwraps', '/ui/whetstorm/items/thornpeak_wildwraps.webp'],
  ['gallowmere_grave_candle', '/ui/whetstorm/items/gallowmere_grave_candle.webp'],
  ['silkbound_remains', '/ui/whetstorm/items/silkbound_remains.webp'],
  ['ancient_crypt_door', '/ui/whetstorm/items/ancient_crypt_door.webp'],
  ['crypt_ritual_circle', '/ui/whetstorm/items/crypt_ritual_circle.webp'],
  ['heroic_fanglords_beastspear', '/ui/whetstorm/items/fanglords_beastspear.webp'],
  ['heroic_deathless_heartwood', '/ui/whetstorm/items/deathless_heartwood.webp'],
  ['heroic_kingsbane_last_oath', '/ui/whetstorm/items/kingsbane_last_oath.webp'],
  ['heroic_wyrmshadow_legguards', '/ui/whetstorm/items/wyrmshadow_legguards.webp'],
  ['heroic_wyrmshadow_talongrips', '/ui/whetstorm/items/wyrmshadow_talongrips.webp'],
]);

export function oct30ThirdOriginalItemImageUrl(id: string): string | null {
  return OCT30_THIRD_ORIGINAL_ITEMS.get(id) ?? null;
}
