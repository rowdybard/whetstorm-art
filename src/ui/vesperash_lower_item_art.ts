// Original paintings for the Vesperash Shroud handwraps and leggings.
const ART = new Map<string, string>([
  ['vesperash_gloves', '/ui/whetstorm/items/vesperash_gloves.webp'],
  ['vesperash_legs', '/ui/whetstorm/items/vesperash_legs.webp'],
]);

export function vesperashLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
