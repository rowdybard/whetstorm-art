// Original paintings for the Stonehearth gauntlets and legguards.
const ART = new Map<string, string>([
  ['stonehearth_gloves', '/ui/whetstorm/items/stonehearth_gloves.webp'],
  ['stonehearth_legs', '/ui/whetstorm/items/stonehearth_legs.webp'],
]);

export function stonehearthLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
