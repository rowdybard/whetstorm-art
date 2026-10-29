// Original Whetstorm stonebound and cadence status paintings, keyed by exact identity.
const STONEBOUND_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['shaman_stonebound_armor', '/ui/whetstorm/auras/shaman_stonebound.webp'],
  ['shaman_stonebound_dr', '/ui/whetstorm/auras/shaman_stonebound.webp'],
  ['shaman_stonebound_stamina', '/ui/whetstorm/auras/shaman_stonebound.webp'],
  ['shaman_stonebound_unleash_guard', '/ui/whetstorm/auras/shaman_stonebound_unleash_guard.webp'],
  ['shaman_stonebound_ward_smooth', '/ui/whetstorm/auras/shaman_stonebound_ward_smooth.webp'],
  ['shaman_warspirit_cadence', '/ui/whetstorm/auras/shaman_warspirit_cadence.webp'],
]);

export function whetstormStoneboundAuraImageUrl(id: string): string | null {
  return STONEBOUND_AURA_ART.get(id) ?? null;
}