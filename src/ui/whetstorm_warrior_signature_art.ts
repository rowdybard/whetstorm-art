// Original paintings for the Warrior signature abilities.
const ART = new Map<string, string>([
  ['charge', '/ui/whetstorm/abilities/charge.webp'],
  ['heroic_strike', '/ui/whetstorm/abilities/heroic_strike.webp'],
  ['execute', '/ui/whetstorm/abilities/execute.webp'],
  ['raised_guard', '/ui/whetstorm/abilities/raised_guard.webp'],
  ['demoralizing_shout', '/ui/whetstorm/abilities/demoralizing_shout.webp'],
  ['taunt', '/ui/whetstorm/abilities/taunt.webp'],
  ['pummel', '/ui/whetstorm/abilities/pummel.webp'],
]);

export function whetstormWarriorSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
