// Original Whetstorm recovery status paintings, keyed by exact aura identity.
const RECOVERY_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['resurrection_sickness', '/ui/whetstorm/auras/resurrection_sickness.webp'],
  ['sated', '/ui/whetstorm/auras/sated.webp'],
  ['unstuck_sickness', '/ui/whetstorm/auras/unstuck_sickness.webp'],
]);

export function whetstormRecoveryAuraImageUrl(id: string): string | null {
  return RECOVERY_AURA_ART.get(id) ?? null;
}