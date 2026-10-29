// Original Whetstorm elemental proc paintings, keyed by exact aura identity.
const ELEMENTAL_PROC_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['convergence_cd', '/ui/whetstorm/auras/elemental_convergence.webp'],
  ['convergence_mark', '/ui/whetstorm/auras/elemental_convergence.webp'],
  ['elemental_convergence', '/ui/whetstorm/auras/elemental_convergence.webp'],
  ['shaman_stormcast', '/ui/whetstorm/auras/shaman_stormcast.webp'],
  ['shaman_stormcast_cheap', '/ui/whetstorm/auras/shaman_stormcast.webp'],
  ['shaman_wayfarer_grace', '/ui/whetstorm/auras/shaman_wayfarer_grace.webp'],
]);

export function whetstormElementalProcAuraImageUrl(id: string): string | null {
  return ELEMENTAL_PROC_AURA_ART.get(id) ?? null;
}