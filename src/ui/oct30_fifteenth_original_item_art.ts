// Original paintings for the fifteenth October 30 item batch.
const ART = new Map<string, string>([
  ['cinderfang_helmet', '/ui/whetstorm/items/cinderfang_helmet.webp'],
  ['cinderfang_shoulder', '/ui/whetstorm/items/cinderfang_shoulder.webp'],
  ['cinderfang_chest', '/ui/whetstorm/items/cinderfang_chest.webp'],
  ['cinderfang_gloves', '/ui/whetstorm/items/cinderfang_gloves.webp'],
  ['pattern_sunspun_handwraps', '/ui/whetstorm/items/pattern_sunspun_handwraps.webp'],
  ['pattern_sunspun_haversack', '/ui/whetstorm/items/pattern_sunspun_haversack.webp'],
  ['pattern_duskforged_warblade', '/ui/whetstorm/items/pattern_duskforged_warblade.webp'],
  ['pattern_ridgebreaker', '/ui/whetstorm/items/pattern_ridgebreaker.webp'],
]);

export function oct30FifteenthOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
