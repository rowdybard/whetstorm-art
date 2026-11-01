// Original paintings for Ignivar druid spell damage waist and feet.
const IGNIVAR_MOONSCORCH_OFFSET_ART = new Map<string, string>([
  ['moonscorch_waistwrap', '/ui/whetstorm/items/moonscorch_waistwrap.webp'],
  ['scorchgrove_striders', '/ui/whetstorm/items/scorchgrove_striders.webp'],
]);

export function ignivarMoonscorchOffsetItemImageUrl(id: string): string | null {
  return IGNIVAR_MOONSCORCH_OFFSET_ART.get(id) ?? null;
}
