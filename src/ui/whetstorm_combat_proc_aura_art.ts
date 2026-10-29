// Original Whetstorm combat proc paintings, keyed by exact aura identity.
const COMBAT_PROC_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['battle_trance', '/ui/whetstorm/auras/battle_trance.webp'],
  ['cauterize_fatigue', '/ui/whetstorm/auras/cauterize_fatigue.webp'],
  ['cauterizing', '/ui/whetstorm/auras/cauterizing.webp'],
  ['heating_up', '/ui/whetstorm/auras/heating_up.webp'],
]);

export function whetstormCombatProcAuraImageUrl(id: string): string | null {
  return COMBAT_PROC_AURA_ART.get(id) ?? null;
}