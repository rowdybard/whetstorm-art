// Original Whetstorm class engine paintings, keyed by exact aura identity.
const ENGINE_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['destruction_ruin', '/ui/whetstorm/auras/destruction_ruin.webp'],
  ['moontide', '/ui/whetstorm/auras/moontide.webp'],
  ['old_blood', '/ui/whetstorm/auras/old_blood.webp'],
  ['verdance', '/ui/whetstorm/auras/verdance.webp'],
]);

export function whetstormEngineAuraImageUrl(id: string): string | null {
  return ENGINE_AURA_ART.get(id) ?? null;
}