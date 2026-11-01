// Exact encounter aura identities; paired simulation components share one effect.
const NYTHRAXIS_BINDING_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['nythraxis_impaled', '/ui/whetstorm/auras/nythraxis_impaled.webp'],
  ['nythraxis_ascension', '/ui/whetstorm/auras/nythraxis_ascension.webp'],
  ['nythraxis_ascension_haste', '/ui/whetstorm/auras/nythraxis_ascension.webp'],
  ['nythraxis_bound', '/ui/whetstorm/auras/nythraxis_bound.webp'],
  ['nythraxis_bound_stun', '/ui/whetstorm/auras/nythraxis_bound.webp'],
]);

export function whetstormNythraxisBindingAuraImageUrl(id: string): string | null {
  return NYTHRAXIS_BINDING_AURA_ART.get(id) ?? null;
}
