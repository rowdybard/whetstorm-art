// Original Ignivar Frostquench lower armor paintings.
const ART = new Map<string, string>([
  ['frostquench_gloves', '/ui/whetstorm/items/frostquench_gloves.webp'],
  ['frostquench_legs', '/ui/whetstorm/items/frostquench_legs.webp'],
]);

export function ignivarFrostquenchLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
