// Original early cooked food paintings in a closed map.
const EARLY_MATERIAL_ELEVEN_ART = new Map<string, string>([
  ['pan_seared_perch', '/ui/whetstorm/items/pan_seared_perch.webp'],
  ['hunters_game_skewer', '/ui/whetstorm/items/hunters_game_skewer.webp'],
  ['brightwood_venison', '/ui/whetstorm/items/brightwood_venison.webp'],
  ['roasted_boar', '/ui/whetstorm/items/roasted_boar.webp'],
]);

export function earlyMaterialElevenItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_ELEVEN_ART.get(id) ?? null;
}
