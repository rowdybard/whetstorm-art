// Original Rimewarden lower equipment paintings.
const ART = new Map<string, string>([
  ['vanguard_mage_frost_legs', '/ui/whetstorm/items/vanguard_mage_frost_legs.webp'],
  ['vanguard_mage_frost_gloves', '/ui/whetstorm/items/vanguard_mage_frost_gloves.webp'],
]);

export function rimewardenLowerItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
