// Original paintings for Emberscreed armor.
const ART = new Map<string, string>([
  ['emberscreed_shoulder', '/ui/whetstorm/items/emberscreed_shoulder.webp'],
  ['emberscreed_chest', '/ui/whetstorm/items/emberscreed_chest.webp'],
  ['emberscreed_gloves', '/ui/whetstorm/items/emberscreed_gloves.webp'],
  ['emberscreed_legs', '/ui/whetstorm/items/emberscreed_legs.webp'],
]);

export function emberscreedItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
