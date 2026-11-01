// Original Ignivar Grovespring lower armor paintings.
const ART = new Map<string, string>([
  ['grovespring_gloves', '/ui/whetstorm/items/grovespring_gloves.webp'],
  ['grovespring_legs', '/ui/whetstorm/items/grovespring_legs.webp'],
]);

export function ignivarGrovespringLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
