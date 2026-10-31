// Original paintings for Crucible mail collection manuals.
const ART = new Map<string, string>([
  ['pattern_crucible_str_mail', '/ui/whetstorm/items/pattern_crucible_str_mail.webp'],
  ['pattern_crucible_tank_mail', '/ui/whetstorm/items/pattern_crucible_tank_mail.webp'],
  ['pattern_crucible_caster_mail', '/ui/whetstorm/items/pattern_crucible_caster_mail.webp'],
  ['pattern_crucible_healer_mail', '/ui/whetstorm/items/pattern_crucible_healer_mail.webp'],
]);

export function crucibleMailPatternItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
