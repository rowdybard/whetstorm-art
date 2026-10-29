// Original Whetstorm mob aura paintings, keyed by exact live runtime identities.
const MOB_AURA_DRAINS: ReadonlyMap<string, string> = new Map([
  ['cost_tax_gravecaller_mender', '/ui/whetstorm/auras/mob_cost_tax.webp'],
  ['critvuln_mire_widow', '/ui/whetstorm/auras/mob_crit_vuln.webp'],
  ['enervate_boneclad_revenant', '/ui/whetstorm/auras/mob_enervate.webp'],
  ['enfeeble_threnos_first_voice', '/ui/whetstorm/auras/mob_enfeeble.webp'],
  ['enfeeble_wyrmcult_zealot', '/ui/whetstorm/auras/mob_enfeeble.webp'],
]);

export function whetstormMobAuraDrainsImageUrl(id: string): string | null {
  return MOB_AURA_DRAINS.get(id) ?? null;
}
