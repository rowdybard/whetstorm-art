// Original paintings for the sixteenth October 30 item batch.
const ART = new Map<string, string>([
  ['cinderfang_legs', '/ui/whetstorm/items/cinderfang_legs.webp'],
  ['smolderstrike_helmet', '/ui/whetstorm/items/smolderstrike_helmet.webp'],
  ['smolderstrike_shoulder', '/ui/whetstorm/items/smolderstrike_shoulder.webp'],
  ['smolderstrike_chest', '/ui/whetstorm/items/smolderstrike_chest.webp'],
  [
    'formula_enchant_feet_shadowstride',
    '/ui/whetstorm/items/formula_enchant_feet_shadowstride.webp',
  ],
  ['formula_enchant_offhand_spirit', '/ui/whetstorm/items/formula_enchant_offhand_spirit.webp'],
  ['schematic_clockwork_shock_bomb', '/ui/whetstorm/items/schematic_clockwork_shock_bomb.webp'],
  ['plans_dense_sharpening_stone', '/ui/whetstorm/items/plans_dense_sharpening_stone.webp'],
]);

export function oct30SixteenthOriginalItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
