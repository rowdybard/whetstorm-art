// Original Whetstorm paintings for exact mob impairment aura identities.
const MOB_AURA_IMPAIRMENTS: ReadonlyMap<string, string> = new Map([
  ['slowstrike_mire_prowler', '/ui/whetstorm/auras/mob_slow_strike.webp'],
  ['stagger_deeprock_kobold', '/ui/whetstorm/auras/mob_stagger_hit.webp'],
  ['tongues_nhalia_mourner', '/ui/whetstorm/auras/mob_tongues.webp'],
  ['wither_fen_troll', '/ui/whetstorm/auras/mob_wither.webp'],
]);

export function whetstormMobAuraImpairmentsImageUrl(id: string): string | null {
  return MOB_AURA_IMPAIRMENTS.get(id) ?? null;
}
