// Original Whetstorm lineage set proc paintings, keyed by exact aura identity.
const LINEAGE_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['set_bonesplinter', '/ui/whetstorm/auras/set_bonesplinter.webp'],
  ['set_fangrush', '/ui/whetstorm/auras/set_fangrush.webp'],
  ['set_gravemight', '/ui/whetstorm/auras/set_gravemight.webp'],
  ['set_ragged_gash', '/ui/whetstorm/auras/set_ragged_gash.webp'],
]);

export function whetstormLineageAuraImageUrl(id: string): string | null {
  return LINEAGE_AURA_ART.get(id) ?? null;
}