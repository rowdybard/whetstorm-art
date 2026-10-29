// Original Whetstorm combat effect paintings, keyed by exact aura identity.
const COMBAT_EFFECT_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['boneglass_cut', '/ui/whetstorm/auras/boneglass_cut.webp'],
  ['fear_incap', '/ui/whetstorm/auras/fear_incap.webp'],
  ['marrowpoint_rend', '/ui/whetstorm/auras/marrowpoint_rend.webp'],
  ['water_jet', '/ui/whetstorm/auras/water_jet.webp'],
  ['water_jet_slow', '/ui/whetstorm/auras/water_jet.webp'],
]);

export function whetstormCombatEffectAuraImageUrl(id: string): string | null {
  return COMBAT_EFFECT_AURA_ART.get(id) ?? null;
}