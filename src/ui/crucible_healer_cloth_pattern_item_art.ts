// Original paintings for the remaining Crucible leather and cloth manuals.
const ART = new Map<string, string>([
  ['pattern_crucible_healer_leather', '/ui/whetstorm/items/pattern_crucible_healer_leather.webp'],
  ['pattern_crucible_caster_cloth', '/ui/whetstorm/items/pattern_crucible_caster_cloth.webp'],
  ['pattern_crucible_healer_cloth', '/ui/whetstorm/items/pattern_crucible_healer_cloth.webp'],
]);

export function crucibleHealerClothPatternItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
