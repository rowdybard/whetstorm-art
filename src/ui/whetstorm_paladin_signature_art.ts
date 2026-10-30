// Original paintings for Paladin signature abilities.
const ART = new Map<string, string>([
  ['holy_light', '/ui/whetstorm/abilities/holy_light.webp'],
  ['hammer_of_grace', '/ui/whetstorm/abilities/hammer_of_grace.webp'],
  ['divine_ascension', '/ui/whetstorm/abilities/divine_ascension.webp'],
  ['dawn_devotion', '/ui/whetstorm/abilities/dawn_devotion.webp'],
]);

export function whetstormPaladinSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
