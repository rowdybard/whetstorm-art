import { whetstormAuraImageUrl } from './whetstorm_aura_art';

// Guide-only ability identities for the same mechanics as these painted auras.
// Keep the mapping exact: nearby phases and consequence effects are not aliases.
const GUIDE_AURA_IDS: ReadonlyMap<string, string> = new Map([
  ['raid_ignivar_brand', 'ignivar_brand_of_the_pyre'],
  ['raid_ignivar_chains', 'ignivar_forge_chains'],
  ['raid_ignivar_last_inferno', 'ignivar_last_inferno'],
  ['raid_varkhul_makers_brand', 'varkhul_makers_brand'],
  ['raid_varkhul_cinder_orbs', 'varkhul_cinder_orbs'],
  ['raid_varkhul_shared_pyre', 'varkhul_shared_pyre'],
  ['raid_varkhul_masters_assembly', 'varkhul_masters_assembly'],
  ['raid_varkhul_masterpiece_unbound', 'varkhul_masterpiece_unbound'],
  ['raid_nythraxis_dread_curse', 'nythraxis_dread_curse'],
  ['raid_nythraxis_soul_rend', 'nythraxis_soul_rend'],
  ['raid_nythraxis_kings_wrath', 'nythraxis_kings_wrath'],
  ['raid_nythraxis_crown_endures', 'nythraxis_crown_endures'],
]);

export function raidGuideAuraArtUrl(id: string): string | null {
  const auraId = GUIDE_AURA_IDS.get(id);
  return auraId ? whetstormAuraImageUrl(auraId) : null;
}
