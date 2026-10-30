// Original Whetstorm encounter aura paintings, keyed by exact runtime identity.
const ENCOUNTER_AURAS: ReadonlyMap<string, string> = new Map([
  ['ignivar_brand_of_the_pyre', '/ui/whetstorm/auras/ignivar_brand_of_the_pyre.webp'],
  ['ignivar_molten_armor', '/ui/whetstorm/auras/ignivar_molten_armor.webp'],
  ['ignivar_last_inferno', '/ui/whetstorm/auras/ignivar_last_inferno.webp'],
  ['nythraxis_bone_storm', '/ui/whetstorm/auras/nythraxis_bone_storm.webp'],
]);

export function whetstormEncounterAuraImageUrl(id: string): string | null {
  return ENCOUNTER_AURAS.get(id) ?? null;
}
