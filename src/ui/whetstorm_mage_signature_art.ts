// Original paintings for key Mage abilities.
const ART = new Map<string, string>([
  ['fireball', '/ui/whetstorm/abilities/fireball.webp'],
  ['frostbolt', '/ui/whetstorm/abilities/frostbolt.webp'],
  ['arcane_missiles', '/ui/whetstorm/abilities/arcane_missiles.webp'],
  ['blink', '/ui/whetstorm/abilities/blink.webp'],
  ['frost_armor', '/ui/whetstorm/abilities/frost_armor.webp'],
  ['arcane_intellect', '/ui/whetstorm/abilities/arcane_intellect.webp'],
  ['conjure_water', '/ui/whetstorm/abilities/conjure_water.webp'],
  ['ice_block', '/ui/whetstorm/abilities/ice_block.webp'],
]);

export function whetstormMageSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
