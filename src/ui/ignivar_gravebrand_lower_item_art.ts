// Original Ignivar Gravebrand lower armor paintings.
const ART = new Map<string, string>([
  ['gravebrand_gloves', '/ui/whetstorm/items/gravebrand_gloves.webp'],
  ['gravebrand_legs', '/ui/whetstorm/items/gravebrand_legs.webp'],
]);

export function ignivarGravebrandLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
