// Original Whetstorm paintings for exact live mob aura identities.
const MOB_AURA_AFFLICTIONS: ReadonlyMap<string, string> = new Map([
  ['smolder_ironvein_sapper', '/ui/whetstorm/auras/mob_smolder.webp'],
  ['smolder_rift_hellguard', '/ui/whetstorm/auras/mob_smolder.webp'],
  ['smolder_rift_magma_brute', '/ui/whetstorm/auras/mob_smolder.webp'],
  ['soulrot_restless_bones', '/ui/whetstorm/auras/mob_soulrot.webp'],
  ['soulrot_rift_boss_necro', '/ui/whetstorm/auras/mob_soulrot.webp'],
  ['soulrot_rift_boss_ritualist', '/ui/whetstorm/auras/mob_soulrot.webp'],
  ['soulrot_rift_pact_acolyte', '/ui/whetstorm/auras/mob_soulrot.webp'],
  ['venom_duskwisp', '/ui/whetstorm/auras/mob_venom.webp'],
  ['venom_old_marrowshell', '/ui/whetstorm/auras/mob_venom.webp'],
  ['venom_rift_venom_weaver', '/ui/whetstorm/auras/mob_venom.webp'],
  ['venom_webwood_spider', '/ui/whetstorm/auras/mob_venom.webp'],
  ['vulnerability_gravecaller_cultist', '/ui/whetstorm/auras/mob_vulnerability.webp'],
]);

export function whetstormMobAuraAfflictionsImageUrl(id: string): string | null {
  return MOB_AURA_AFFLICTIONS.get(id) ?? null;
}
