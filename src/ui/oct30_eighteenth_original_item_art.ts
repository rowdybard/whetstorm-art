// Original paintings for the eighteenth October 30 item batch.
const ART = new Map<string, string>([
  ['ashveil_chest', '/ui/whetstorm/items/ashveil_chest.webp'],
  ['ashveil_gloves', '/ui/whetstorm/items/ashveil_gloves.webp'],
  ['ashveil_legs', '/ui/whetstorm/items/ashveil_legs.webp'],
  ['emberscreed_helmet', '/ui/whetstorm/items/emberscreed_helmet.webp'],
  ['formula_riftwalkers_grace', '/ui/whetstorm/items/formula_riftwalkers_grace.webp'],
  ['formula_lastflame_zeal', '/ui/whetstorm/items/formula_lastflame_zeal.webp'],
  ['pattern_masters_field_forge', '/ui/whetstorm/items/pattern_masters_field_forge.webp'],
  ['pattern_makers_charm', '/ui/whetstorm/items/pattern_makers_charm.webp'],
]);

export function oct30EighteenthOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
