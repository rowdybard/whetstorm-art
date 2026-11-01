// Original Ignivar Gravebrand upper armor paintings.
const ART = new Map<string, string>([
  ['gravebrand_helmet', '/ui/whetstorm/items/gravebrand_helmet.webp'],
  ['gravebrand_shoulder', '/ui/whetstorm/items/gravebrand_shoulder.webp'],
  ['gravebrand_chest', '/ui/whetstorm/items/gravebrand_chest.webp'],
]);

export function ignivarGravebrandUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
