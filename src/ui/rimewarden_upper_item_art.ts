// Original Rimewarden upper equipment paintings.
const ART = new Map<string, string>([
  ['vanguard_mage_frost_helmet', '/ui/whetstorm/items/vanguard_mage_frost_helmet.webp'],
  ['vanguard_mage_frost_shoulder', '/ui/whetstorm/items/vanguard_mage_frost_shoulder.webp'],
  ['vanguard_mage_frost_chest', '/ui/whetstorm/items/vanguard_mage_frost_chest.webp'],
]);

export function rimewardenUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
