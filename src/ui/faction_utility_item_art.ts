// Original faction utility paintings in a closed map.
const ART = new Map<string, string>([
  ['rift_feather_glider', '/ui/whetstorm/items/rift_feather_glider.webp'],
  ['clockwork_target_dummy', '/ui/whetstorm/items/clockwork_target_dummy.webp'],
  ['clockwork_shock_bomb', '/ui/whetstorm/items/clockwork_shock_bomb.webp'],
  ['allied_hearthstone', '/ui/whetstorm/items/allied_hearthstone.webp'],
]);

export function factionUtilityItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
