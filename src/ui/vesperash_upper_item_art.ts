// Original paintings for the Vesperash Shroud hood, mantle, and robe.
const ART = new Map<string, string>([
  ['vesperash_helmet', '/ui/whetstorm/items/vesperash_helmet.webp'],
  ['vesperash_shoulder', '/ui/whetstorm/items/vesperash_shoulder.webp'],
  ['vesperash_chest', '/ui/whetstorm/items/vesperash_chest.webp'],
]);

export function vesperashUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
