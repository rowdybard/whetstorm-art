// Original paintings for Priest signature abilities.
const ART = new Map<string, string>([
  ['smite', '/ui/whetstorm/abilities/smite.webp'],
  ['power_word_shield', '/ui/whetstorm/abilities/power_word_shield.webp'],
  ['renew', '/ui/whetstorm/abilities/renew.webp'],
  ['mind_blast', '/ui/whetstorm/abilities/mind_blast.webp'],
]);

export function whetstormPriestSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
