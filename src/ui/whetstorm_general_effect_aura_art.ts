// Original Whetstorm general effect paintings, keyed by exact aura identity.
const GENERAL_EFFECT_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['bg_carrier_vulnerability', '/ui/whetstorm/auras/bg_carrier_vulnerability.webp'],
  ['elixir_buff_sta', '/ui/whetstorm/auras/elixir_buff_sta.webp'],
  ['set_clearcasting', '/ui/whetstorm/auras/set_clearcasting.webp'],
  ['set_soulblaze', '/ui/whetstorm/auras/set_soulblaze.webp'],
]);

export function whetstormGeneralEffectAuraImageUrl(id: string): string | null {
  return GENERAL_EFFECT_AURA_ART.get(id) ?? null;
}