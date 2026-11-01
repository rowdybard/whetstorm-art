// Original Varkhul encounter aura paintings, keyed by exact runtime identity.
const ART = new Map<string, string>([
  ['varkhul_tempered_wound', '/ui/whetstorm/auras/varkhul_tempered_wound.webp'],
  ['varkhul_shared_pyre', '/ui/whetstorm/auras/varkhul_shared_pyre.webp'],
]);

export function varkhulBeamSoakAuraImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
