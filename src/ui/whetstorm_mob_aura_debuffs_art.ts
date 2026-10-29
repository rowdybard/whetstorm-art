// Original Whetstorm mob aura paintings, keyed by exact live runtime identities.
const MOB_AURA_DEBUFFS: ReadonlyMap<string, string> = new Map([
  ['corrode_deepfen_murloc', '/ui/whetstorm/auras/mob_corrode.webp'],
  ['corrode_reliquary_ledger_wraith', '/ui/whetstorm/auras/mob_corrode.webp'],
  ['corrode_rift_deep_lurker', '/ui/whetstorm/auras/mob_corrode.webp'],
  ['disarm_ogre_crusher', '/ui/whetstorm/auras/mob_disarm.webp'],
  ['ensnare_rift_boss_venom', '/ui/whetstorm/auras/mob_ensnare.webp'],
  ['ensnare_rift_venom_weaver', '/ui/whetstorm/auras/mob_ensnare.webp'],
  ['ensnare_webwood_spider', '/ui/whetstorm/auras/mob_ensnare.webp'],
  ['frostbite_rift_rime_elemental', '/ui/whetstorm/auras/mob_frostbite.webp'],
  ['frostbite_shardlord_kazzix', '/ui/whetstorm/auras/mob_frostbite.webp'],
]);

export function whetstormMobAuraDebuffsImageUrl(id: string): string | null {
  return MOB_AURA_DEBUFFS.get(id) ?? null;
}
