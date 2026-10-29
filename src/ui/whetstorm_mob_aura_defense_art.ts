// Original Whetstorm paintings for exact live mob aura identities.
const MOB_AURA_DEFENSE: ReadonlyMap<string, string> = new Map([
  ['stoneskin_ancient_guardian', '/ui/whetstorm/auras/mob_stoneskin.webp'],
  ['stoneskin_marrowlord_varkas', '/ui/whetstorm/auras/mob_stoneskin.webp'],
  ['stoneskin_old_marrowshell', '/ui/whetstorm/auras/mob_stoneskin.webp'],
  ['stoneskin_rift_boss_arcane', '/ui/whetstorm/auras/mob_stoneskin.webp'],
  ['stoneskin_rift_boss_frost', '/ui/whetstorm/auras/mob_stoneskin.webp'],
  ['stoneskin_sump_troll_devourer', '/ui/whetstorm/auras/mob_stoneskin.webp'],
  ['stoneskin_thunzharr_waking_peak', '/ui/whetstorm/auras/mob_stoneskin.webp'],
  ['stun_mogger_lackey', '/ui/whetstorm/auras/mob_stun_on_hit.webp'],
  ['stun_rift_stone_ogre', '/ui/whetstorm/auras/mob_stun_on_hit.webp'],
  ['warcry_deepfen_murloc', '/ui/whetstorm/auras/mob_warcry.webp'],
  ['warcry_wildheart_beastmaster', '/ui/whetstorm/auras/mob_warcry.webp'],
  ['ward_grave_silt_bulwark', '/ui/whetstorm/auras/mob_ward_allies.webp'],
  ['ward_mogger', '/ui/whetstorm/auras/mob_ward_allies.webp'],
  ['ward_treant_elder', '/ui/whetstorm/auras/mob_ward_allies.webp'],
  ['ward_wildheart_beastmaster', '/ui/whetstorm/auras/mob_ward_allies.webp'],
]);

export function whetstormMobAuraDefenseImageUrl(id: string): string | null {
  return MOB_AURA_DEFENSE.get(id) ?? null;
}
