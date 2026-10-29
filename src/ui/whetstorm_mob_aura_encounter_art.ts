// Exact runtime aura IDs emitted by mob and delve encounter mechanics.
const MOB_AURA_ENCOUNTER: ReadonlyMap<string, string> = new Map([
  ['stomp_stun', '/ui/whetstorm/auras/mob_encounter_stun.webp'],
  ['brood_counter_stun', '/ui/whetstorm/auras/mob_encounter_stun.webp'],
  ['brood_burn_hatchling_burn', '/ui/whetstorm/auras/mob_brood_burn.webp'],
  ['brood_burn_seared_scales', '/ui/whetstorm/auras/mob_brood_burn.webp'],
  ['brood_ward', '/ui/whetstorm/auras/mob_brood_ward.webp'],
  ['nhalia_cantor_shield', '/ui/whetstorm/auras/mob_cantor_shield.webp'],
]);

export function whetstormMobAuraEncounterImageUrl(id: string): string | null {
  return MOB_AURA_ENCOUNTER.get(id) ?? null;
}
