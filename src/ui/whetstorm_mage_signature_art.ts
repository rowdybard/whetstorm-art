// Original paintings for key Mage abilities.
const ART = new Map<string, string>([
  ['fireball', '/ui/whetstorm/abilities/fireball.webp'],
  ['frostbolt', '/ui/whetstorm/abilities/frostbolt.webp'],
  ['arcane_missiles', '/ui/whetstorm/abilities/arcane_missiles.webp'],
  ['blink', '/ui/whetstorm/abilities/blink.webp'],
]);

export function whetstormMageSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
