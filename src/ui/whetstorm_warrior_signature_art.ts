// Original paintings for the Warrior signature abilities.
const ART = new Map<string, string>([
  ['charge', '/ui/whetstorm/abilities/charge.webp'],
  ['heroic_strike', '/ui/whetstorm/abilities/heroic_strike.webp'],
  ['execute', '/ui/whetstorm/abilities/execute.webp'],
]);

export function whetstormWarriorSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
