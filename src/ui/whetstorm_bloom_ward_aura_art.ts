// Original Whetstorm bloom and ward status paintings, keyed by exact aura identity.
const BLOOM_WARD_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['deathbloom', '/ui/whetstorm/auras/deathbloom.webp'],
  ['lifebloom', '/ui/whetstorm/auras/lifebloom.webp'],
  ['nythraxis_transition_pause', '/ui/whetstorm/auras/nythraxis_transition_pause.webp'],
  ['nythraxis_wardstone_lit', '/ui/whetstorm/auras/nythraxis_wardstone_lit.webp'],
]);

export function whetstormBloomWardAuraImageUrl(id: string): string | null {
  return BLOOM_WARD_AURA_ART.get(id) ?? null;
}