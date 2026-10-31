// Original paintings for the Stormkindled helm, pauldrons, and hauberk.
const ART = new Map<string, string>([
  ['stormkindled_helmet', '/ui/whetstorm/items/stormkindled_helmet.webp'],
  ['stormkindled_shoulder', '/ui/whetstorm/items/stormkindled_shoulder.webp'],
  ['stormkindled_chest', '/ui/whetstorm/items/stormkindled_chest.webp'],
]);

export function stormkindledUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
