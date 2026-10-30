// Exact runtime identities emitted by the Varkhul encounter.
const VARKHUL_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['varkhul_makers_brand', '/ui/whetstorm/auras/varkhul_makers_brand.webp'],
  ['varkhul_cinder_orbs', '/ui/whetstorm/auras/varkhul_cinder_orbs.webp'],
  ['varkhul_red_hot_metal', '/ui/whetstorm/auras/varkhul_red_hot_metal.webp'],
  ['varkhul_masters_assembly', '/ui/whetstorm/auras/varkhul_masters_assembly.webp'],
]);

export function whetstormVarkhulAuraImageUrl(id: string): string | null {
  return VARKHUL_AURA_ART.get(id) ?? null;
}
