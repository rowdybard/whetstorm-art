// Original paintings for Ranger signature abilities.
const ART = new Map<string, string>([
  ['measured_shot', '/ui/whetstorm/abilities/measured_shot.webp'],
  ['pack_command', '/ui/whetstorm/abilities/pack_command.webp'],
  ['frostjaw_trap', '/ui/whetstorm/abilities/frostjaw_trap.webp'],
  ['trailbreak', '/ui/whetstorm/abilities/trailbreak.webp'],
]);

export function whetstormRangerSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
