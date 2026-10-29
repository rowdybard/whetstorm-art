// Original Whetstorm paintings for exact live mob aura identities.
const MOB_AURA_MAGIC: ReadonlyMap<string, string> = new Map([
  ['blood_frenzy', '/ui/whetstorm/auras/mob_frenzy_on_hit.webp'],
  ['silence_gravecaller_summoner', '/ui/whetstorm/auras/mob_silence.webp'],
  ['siphon_spirit_sister_nhalia', '/ui/whetstorm/auras/mob_siphon_spirit.webp'],
  ['spellvuln_rift_boss_arcane', '/ui/whetstorm/auras/mob_spell_vuln.webp'],
  ['spellvuln_stormcrag_elemental', '/ui/whetstorm/auras/mob_spell_vuln.webp'],
]);

export function whetstormMobAuraMagicImageUrl(id: string): string | null {
  return MOB_AURA_MAGIC.get(id) ?? null;
}
