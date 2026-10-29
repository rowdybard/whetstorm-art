// Original Whetstorm mob aura paintings, keyed by exact live runtime identities.
const MOB_AURA_ORIGINAL_BATCH: ReadonlyMap<string, string> = new Map([
  ['aoe_slow', '/ui/whetstorm/auras/mob_aoe_slow.webp'],
  ['bleed_ridge_stalker', '/ui/whetstorm/auras/mob_bleed.webp'],
  ['bleed_rift_thornback', '/ui/whetstorm/auras/mob_bleed.webp'],
  ['bleed_wildheart_ravager', '/ui/whetstorm/auras/mob_bleed.webp'],
  ['stackpoison_mirefen_broodmother', '/ui/whetstorm/auras/mob_stack_poison.webp'],
  ['stackpoison_rift_boss_venom', '/ui/whetstorm/auras/mob_stack_poison.webp'],
  ['plague_drowned_dead', '/ui/whetstorm/auras/mob_plague.webp'],
  ['plague_fenbridge_infiltrator', '/ui/whetstorm/auras/mob_plague.webp'],
  ['plague_drowned_warlord', '/ui/whetstorm/auras/mob_plague.webp'],
]);

export function whetstormMobAuraBatchImageUrl(id: string): string | null {
  return MOB_AURA_ORIGINAL_BATCH.get(id) ?? null;
}
