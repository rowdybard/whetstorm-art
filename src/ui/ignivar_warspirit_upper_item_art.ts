// Original Ignivar Warspirit Emberscale upper armor paintings.
const ART = new Map<string, string>([
  ['warspirit_emberscale_helmet', '/ui/whetstorm/items/warspirit_emberscale_helmet.webp'],
  ['warspirit_emberscale_shoulder', '/ui/whetstorm/items/warspirit_emberscale_shoulder.webp'],
  ['warspirit_emberscale_chest', '/ui/whetstorm/items/warspirit_emberscale_chest.webp'],
]);

export function ignivarWarspiritUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
