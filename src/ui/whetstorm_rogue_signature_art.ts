// Original paintings for key Rogue abilities.
const ART = new Map<string, string>([
  ['sinister_strike', '/ui/whetstorm/abilities/sinister_strike.webp'],
  ['eviscerate', '/ui/whetstorm/abilities/eviscerate.webp'],
  ['backstab', '/ui/whetstorm/abilities/backstab.webp'],
  ['stealth', '/ui/whetstorm/abilities/stealth.webp'],
  ['evasion', '/ui/whetstorm/abilities/evasion.webp'],
  ['sprint', '/ui/whetstorm/abilities/sprint.webp'],
  ['vanish', '/ui/whetstorm/abilities/vanish.webp'],
  ['kick', '/ui/whetstorm/abilities/kick.webp'],
]);

export function whetstormRogueSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
