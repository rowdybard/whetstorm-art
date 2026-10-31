// Original paintings for the Stormkindled gauntlets and legguards.
const ART = new Map<string, string>([
  ['stormkindled_gloves', '/ui/whetstorm/items/stormkindled_gloves.webp'],
  ['stormkindled_legs', '/ui/whetstorm/items/stormkindled_legs.webp'],
]);

export function stormkindledLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
