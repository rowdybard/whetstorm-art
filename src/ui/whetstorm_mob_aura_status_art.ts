// Original Whetstorm mob aura paintings for exact live runtime identities.
const MOB_AURA_STATUS: ReadonlyMap<string, string> = new Map([
  ['arcaneRot_deacon_voss', '/ui/whetstorm/auras/mob_arcane_rot.webp'],
  ['arcaneRot_rift_void_acolyte', '/ui/whetstorm/auras/mob_arcane_rot.webp'],
  ['blind_vale_bandit', '/ui/whetstorm/auras/mob_blind.webp'],
  ['cinder_ironvein_sapper', '/ui/whetstorm/auras/mob_cinder.webp'],
  ['cinder_rift_boss_ember', '/ui/whetstorm/auras/mob_cinder.webp'],
  ['cinder_rift_ember_fiend', '/ui/whetstorm/auras/mob_cinder.webp'],
  ['concuss_brakka_wallbreaker', '/ui/whetstorm/auras/mob_concuss.webp'],
  ['concuss_rift_boss_storm', '/ui/whetstorm/auras/mob_concuss.webp'],
  ['concuss_rift_storm_caller', '/ui/whetstorm/auras/mob_concuss.webp'],
  ['concuss_thornpeak_ogre', '/ui/whetstorm/auras/mob_concuss.webp'],
]);

export function whetstormMobAuraStatusImageUrl(id: string): string | null {
  return MOB_AURA_STATUS.get(id) ?? null;
}
