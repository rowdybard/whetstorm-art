// Original Ignivar Moonscorch upper armor paintings.
const ART = new Map<string, string>([
  ['moonscorch_helmet', '/ui/whetstorm/items/moonscorch_helmet.webp'],
  ['moonscorch_shoulder', '/ui/whetstorm/items/moonscorch_shoulder.webp'],
  ['moonscorch_chest', '/ui/whetstorm/items/moonscorch_chest.webp'],
]);

export function ignivarMoonscorchUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
