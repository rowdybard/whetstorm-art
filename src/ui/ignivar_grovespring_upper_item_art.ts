// Original Ignivar Grovespring upper armor paintings.
const ART = new Map<string, string>([
  ['grovespring_helmet', '/ui/whetstorm/items/grovespring_helmet.webp'],
  ['grovespring_shoulder', '/ui/whetstorm/items/grovespring_shoulder.webp'],
  ['grovespring_chest', '/ui/whetstorm/items/grovespring_chest.webp'],
]);

export function ignivarGrovespringUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
