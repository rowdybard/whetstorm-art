// Original Whetstorm warfare set proc paintings, keyed by exact aura identity.
const WARFARE_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['set_warfare_ashen_step', '/ui/whetstorm/auras/set_warfare_ashen_step.webp'],
  ['set_warfare_emberward', '/ui/whetstorm/auras/set_warfare_emberward.webp'],
  ['set_warfare_thornguard', '/ui/whetstorm/auras/set_warfare_thornguard.webp'],
  ['set_warfare_unbroken_oath', '/ui/whetstorm/auras/set_warfare_unbroken_oath.webp'],
]);

export function whetstormWarfareAuraImageUrl(id: string): string | null {
  return WARFARE_AURA_ART.get(id) ?? null;
}