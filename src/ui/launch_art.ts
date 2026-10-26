// Presentation identities from the owner's launch art brief. These do not add
// or rename PlayerClass/AbilityDef records in the simulation.
export const LAUNCH_CLASS_ART_IDS = [
  'bulwark',
  'brute',
  'whirlblade',
  'ranger',
  'skybinder',
  'cleric',
  'warden',
] as const;
export const BULWARK_ABILITY_ART_IDS = [
  'bulwark_spear_thrust',
  'bulwark_shield_sweep',
  'bulwark_challenge',
  'bulwark_javelin',
  'bulwark_shield_rush',
  'bulwark_release',
  'bulwark_breakwater',
  'bulwark_unbroken',
] as const;

const classes = new Map<string, string>(
  LAUNCH_CLASS_ART_IDS.map((id) => [id, `/ui/classes/${id}.webp`]),
);
const abilities = new Map<string, string>(
  BULWARK_ABILITY_ART_IDS.map((id) => [id, `/ui/skills/bulwark/${id}.webp`]),
);

export function launchClassIconUrl(id: string): string | null {
  return classes.get(id) ?? null;
}

export function launchAbilityImageUrl(id: string): string | null {
  return abilities.get(id) ?? null;
}
