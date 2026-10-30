// Original paintings for the ninth October 30 item batch.
const ART = new Map<string, string>([
  ['pactbound_vestments', '/ui/whetstorm/items/pactbound_vestments.webp'],
  ['emberforged_bulwark', '/ui/whetstorm/items/emberforged_bulwark.webp'],
  ['stormsunder_hood', '/ui/whetstorm/items/stormsunder_hood.webp'],
  ['voidweave_mantle', '/ui/whetstorm/items/voidweave_mantle.webp'],
  ['pattern_ironhusk_flask', '/ui/whetstorm/items/pattern_ironhusk_flask.webp'],
  ['pattern_warboar_flask', '/ui/whetstorm/items/pattern_warboar_flask.webp'],
  ['pattern_runewater_flask', '/ui/whetstorm/items/pattern_runewater_flask.webp'],
  ['pattern_clockreel_fishing_rod', '/ui/whetstorm/items/pattern_clockreel_fishing_rod.webp'],
]);

export function oct30NinthOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
