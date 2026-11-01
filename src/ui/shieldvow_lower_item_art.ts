// Original Season 2 Shieldvow lower armor paintings.
const ART = new Map<string, string>([
  ['vanguard_paladin_protection_legs', '/ui/whetstorm/items/vanguard_paladin_protection_legs.webp'],
  ['vanguard_paladin_protection_gloves', '/ui/whetstorm/items/vanguard_paladin_protection_gloves.webp'],
]);

export function shieldvowLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
