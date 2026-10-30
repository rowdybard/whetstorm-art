// Original Whetstorm hunter cooldown paintings, keyed by exact aura identity.
const HUNTER_COOLDOWN_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['hunter_enduring_courser_icd', '/ui/whetstorm/auras/hunter_enduring_courser_icd.webp'],
  ['hunter_predators_pace_icd', '/ui/whetstorm/auras/hunter_predators_pace_icd.webp'],
]);

export function whetstormHunterCooldownAuraImageUrl(id: string): string | null {
  return HUNTER_COOLDOWN_AURA_ART.get(id) ?? null;
}