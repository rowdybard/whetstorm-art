// Original Nythraxis encounter aura paintings, keyed by exact runtime identity.
const ART = new Map<string, string>([
  ['nythraxis_unbound', '/ui/whetstorm/auras/nythraxis_unbound.webp'],
  ['nythraxis_kings_wrath', '/ui/whetstorm/auras/nythraxis_kings_wrath.webp'],
  ['nythraxis_crown_endures', '/ui/whetstorm/auras/nythraxis_crown_endures.webp'],
  ['nythraxis_crown_endures_haste', '/ui/whetstorm/auras/nythraxis_crown_endures.webp'],
]);

export function nythraxisEnrageAuraImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
