// Original paintings for the fourteenth October 30 item batch.
const ART = new Map<string, string>([
  ['monarch_crown_helm', '/ui/whetstorm/items/monarch_crown_helm.webp'],
  ['wardens_oathband', '/ui/whetstorm/items/wardens_oathband.webp'],
  ['vineclaw_stalking_breeches', '/ui/whetstorm/items/vineclaw_stalking_breeches.webp'],
  ['sunken_idol_mantle', '/ui/whetstorm/items/sunken_idol_mantle.webp'],
  ['pattern_fenbloom_breeches', '/ui/whetstorm/items/pattern_fenbloom_breeches.webp'],
  ['pattern_barksong_handguards', '/ui/whetstorm/items/pattern_barksong_handguards.webp'],
  ['pattern_sunspun_vestments', '/ui/whetstorm/items/pattern_sunspun_vestments.webp'],
  ['pattern_sunspun_leggings', '/ui/whetstorm/items/pattern_sunspun_leggings.webp'],
]);

export function oct30FourteenthOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
