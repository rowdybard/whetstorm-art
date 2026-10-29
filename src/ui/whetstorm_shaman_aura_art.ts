// Original Whetstorm shaman status paintings, keyed by exact aura identity.
const SHAMAN_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['shaman_ancestral_bulwark', '/ui/whetstorm/auras/shaman_ancestral_bulwark.webp'],
  ['shaman_gathering_winds', '/ui/whetstorm/auras/shaman_gathering_winds.webp'],
  ['shaman_mending_current', '/ui/whetstorm/auras/shaman_mending_current.webp'],
  ['shaman_thunder_charges', '/ui/whetstorm/auras/shaman_thunder_charges.webp'],
]);

export function whetstormShamanAuraImageUrl(id: string): string | null {
  return SHAMAN_AURA_ART.get(id) ?? null;
}