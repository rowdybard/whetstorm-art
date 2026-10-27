// Original early marsh quest item paintings in a closed map.
const EARLY_MATERIAL_THIRTEEN_ART = new Map<string, string>([
  ['mire_prowler_pelt', '/ui/whetstorm/items/mire_prowler_pelt.webp'],
  ['waterlogged_idol', '/ui/whetstorm/items/waterlogged_idol.webp'],
  ['widow_venom_sac', '/ui/whetstorm/items/widow_venom_sac.webp'],
  ['troll_fetish', '/ui/whetstorm/items/troll_fetish.webp'],
]);

export function earlyMaterialThirteenItemImageUrl(id: string): string | null {
  return EARLY_MATERIAL_THIRTEEN_ART.get(id) ?? null;
}
