// Original Whetstorm paintings for these exact live mob aura identities.
const MOB_AURA_CURSES: ReadonlyMap<string, string> = new Map([
  ['expose_varkas_boneguard', '/ui/whetstorm/auras/mob_expose.webp'],
  ['heal_absorb_gravecaller_summoner', '/ui/whetstorm/auras/mob_heal_absorb.webp'],
  ['heal_absorb_rift_boss_necro', '/ui/whetstorm/auras/mob_heal_absorb.webp'],
  ['hex_gravecaller_cultist', '/ui/whetstorm/auras/mob_hex.webp'],
  ['hex_mudfin_murloc', '/ui/whetstorm/auras/mob_polymorph_hex.webp'],
]);

export function whetstormMobAuraCursesImageUrl(id: string): string | null {
  return MOB_AURA_CURSES.get(id) ?? null;
}
