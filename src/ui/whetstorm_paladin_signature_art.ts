// Original paintings for Paladin signature abilities.
const ART = new Map<string, string>([
  ['holy_light', '/ui/whetstorm/abilities/holy_light.webp'],
  ['hammer_of_grace', '/ui/whetstorm/abilities/hammer_of_grace.webp'],
  ['divine_ascension', '/ui/whetstorm/abilities/divine_ascension.webp'],
  ['dawn_devotion', '/ui/whetstorm/abilities/dawn_devotion.webp'],
  ['blessing_of_might', '/ui/whetstorm/abilities/paladin_utility_blessing_of_might.webp'],
  ['divine_protection', '/ui/whetstorm/abilities/paladin_utility_divine_protection.webp'],
  ['hammer_of_justice', '/ui/whetstorm/abilities/paladin_utility_hammer_of_justice.webp'],
  ['lay_on_hands', '/ui/whetstorm/abilities/paladin_utility_lay_on_hands.webp'],
]);

export function whetstormPaladinSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
