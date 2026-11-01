// Original Season 2 Shieldvow upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_paladin_protection_helmet', '/ui/whetstorm/items/vanguard_paladin_protection_helmet.webp'],
  ['vanguard_paladin_protection_shoulder', '/ui/whetstorm/items/vanguard_paladin_protection_shoulder.webp'],
  ['vanguard_paladin_protection_chest', '/ui/whetstorm/items/vanguard_paladin_protection_chest.webp'],
]);

export function shieldvowUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
