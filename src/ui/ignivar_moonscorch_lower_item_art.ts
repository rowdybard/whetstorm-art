// Original Ignivar Moonscorch lower armor paintings.
const ART = new Map<string, string>([
  ['moonscorch_gloves', '/ui/whetstorm/items/moonscorch_gloves.webp'],
  ['moonscorch_legs', '/ui/whetstorm/items/moonscorch_legs.webp'],
]);

export function ignivarMoonscorchLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
