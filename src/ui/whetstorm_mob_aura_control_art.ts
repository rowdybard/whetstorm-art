// Original Whetstorm mob control and weakened attack aura paintings.
const MOB_AURA_CONTROL: ReadonlyMap<string, string> = new Map([
  ['lockout_threnos_first_voice', '/ui/whetstorm/auras/mob_lockout.webp'],
  ['lockout_wyrmcult_zealot', '/ui/whetstorm/auras/mob_lockout.webp'],
  ['mirefen_widowling_chill', '/ui/whetstorm/auras/mob_chill_on_hit.webp'],
  ['rift_frost_revenant_chill', '/ui/whetstorm/auras/mob_chill_on_hit.webp'],
  ['stormcrag_elemental_chill', '/ui/whetstorm/auras/mob_chill_on_hit.webp'],
  ['mob_charge_stun', '/ui/whetstorm/auras/mob_charge_stun.webp'],
  ['mob_demoralize', '/ui/whetstorm/auras/mob_demoralize.webp'],
]);

export function whetstormMobAuraControlImageUrl(id: string): string | null {
  return MOB_AURA_CONTROL.get(id) ?? null;
}
