// Original paintings for Ignivar druid leather waist and feet.
const IGNIVAR_CINDERBARK_OFFSET_ART = new Map<string, string>([
  ['cinderbark_cinch', '/ui/whetstorm/items/cinderbark_cinch.webp'],
  ['ashenbark_treads', '/ui/whetstorm/items/ashenbark_treads.webp'],
]);

export function ignivarCinderbarkOffsetItemImageUrl(id: string): string | null {
  return IGNIVAR_CINDERBARK_OFFSET_ART.get(id) ?? null;
}
