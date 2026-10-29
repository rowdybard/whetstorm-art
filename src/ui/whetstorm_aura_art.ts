// Original Whetstorm aura paintings, keyed by exact runtime identity.
const WHETSTORM_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['well_fed', '/ui/whetstorm/auras/well_fed.webp'],
]);

export function whetstormAuraImageUrl(id: string): string | null {
  return WHETSTORM_AURA_ART.get(id) ?? null;
}
