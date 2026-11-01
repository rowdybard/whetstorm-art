// Original Ignivar Frostquench upper armor paintings.
const ART = new Map<string, string>([
  ['frostquench_helmet', '/ui/whetstorm/items/frostquench_helmet.webp'],
  ['frostquench_shoulder', '/ui/whetstorm/items/frostquench_shoulder.webp'],
  ['frostquench_chest', '/ui/whetstorm/items/frostquench_chest.webp'],
]);

export function ignivarFrostquenchUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
