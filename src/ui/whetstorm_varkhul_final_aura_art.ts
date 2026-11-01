// Exact active Varkhul encounter aura identities.
const VARKHUL_FINAL_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['varkhul_forge_shattered', '/ui/whetstorm/auras/varkhul_forge_shattered.webp'],
  ['varkhul_crucible_exposure', '/ui/whetstorm/auras/varkhul_crucible_exposure.webp'],
  ['varkhul_masterpiece_unbound', '/ui/whetstorm/auras/varkhul_masterpiece_unbound.webp'],
]);

export function whetstormVarkhulFinalAuraImageUrl(id: string): string | null {
  return VARKHUL_FINAL_AURA_ART.get(id) ?? null;
}
