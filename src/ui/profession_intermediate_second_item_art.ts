// Original skill-75 profession component paintings in a closed map.
const PROFESSION_INTERMEDIATE_SECOND_ART = new Map<string, string>([
  ['prismglass_setting', '/ui/whetstorm/items/prismglass_setting.webp'],
  ['precision_chassis', '/ui/whetstorm/items/precision_chassis.webp'],
  ['quickening_catalyst', '/ui/whetstorm/items/quickening_catalyst.webp'],
  ['sablewax_vellum', '/ui/whetstorm/items/sablewax_vellum.webp'],
]);

export function professionIntermediateSecondItemImageUrl(id: string): string | null {
  return PROFESSION_INTERMEDIATE_SECOND_ART.get(id) ?? null;
}
