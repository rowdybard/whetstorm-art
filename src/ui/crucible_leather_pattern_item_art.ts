// Original paintings for Crucible leather collection manuals.
const ART = new Map<string, string>([
  ['pattern_crucible_agi_leather', '/ui/whetstorm/items/pattern_crucible_agi_leather.webp'],
  ['pattern_crucible_str_leather', '/ui/whetstorm/items/pattern_crucible_str_leather.webp'],
  ['pattern_crucible_tank_leather', '/ui/whetstorm/items/pattern_crucible_tank_leather.webp'],
  ['pattern_crucible_caster_leather', '/ui/whetstorm/items/pattern_crucible_caster_leather.webp'],
]);

export function crucibleLeatherPatternItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
