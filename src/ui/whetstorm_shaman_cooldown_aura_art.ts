// Original Whetstorm shaman cooldown paintings, keyed by exact aura identity.
const SHAMAN_COOLDOWN_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['shaman_ancestral_bulwark_icd', '/ui/whetstorm/auras/shaman_ancestral_bulwark_icd.webp'],
  ['shaman_gathering_winds_icd', '/ui/whetstorm/auras/shaman_gathering_winds_icd.webp'],
  ['shaman_wayfarer_grace_icd', '/ui/whetstorm/auras/shaman_wayfarer_grace_icd.webp'],
]);

export function whetstormShamanCooldownAuraImageUrl(id: string): string | null {
  return SHAMAN_COOLDOWN_AURA_ART.get(id) ?? null;
}