import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { iconDataUrl } from '../src/ui/icons';
import { raidGuideAuraArtUrl } from '../src/ui/raid_guide_aura_art';
import { raidBossGuideView, type RaidBossGuideBoss } from '../src/ui/raid_boss_guide_view';

const mappings = [
  ['ignivar', 'raid_ignivar_brand', 'ignivar_brand_of_the_pyre'],
  ['ignivar', 'raid_ignivar_chains', 'ignivar_forge_chains'],
  ['ignivar', 'raid_ignivar_last_inferno', 'ignivar_last_inferno'],
  ['varkhul', 'raid_varkhul_makers_brand', 'varkhul_makers_brand'],
  ['varkhul', 'raid_varkhul_cinder_orbs', 'varkhul_cinder_orbs'],
  ['varkhul', 'raid_varkhul_shared_pyre', 'varkhul_shared_pyre'],
  ['varkhul', 'raid_varkhul_masters_assembly', 'varkhul_masters_assembly'],
  ['varkhul', 'raid_varkhul_masterpiece_unbound', 'varkhul_masterpiece_unbound'],
  ['nythraxis', 'raid_nythraxis_dread_curse', 'nythraxis_dread_curse'],
  ['nythraxis', 'raid_nythraxis_soul_rend', 'nythraxis_soul_rend'],
  ['nythraxis', 'raid_nythraxis_kings_wrath', 'nythraxis_kings_wrath'],
  ['nythraxis', 'raid_nythraxis_crown_endures', 'nythraxis_crown_endures'],
] as const;

describe('Raid Boss Guide encounter painting reuse', () => {
  it('routes each actual active guide mechanic to its exact original aura painting', () => {
    for (const [boss, guideId, auraId] of mappings) {
      const view = raidBossGuideView(boss as RaidBossGuideBoss, 'heroic');
      expect(view.phases.flatMap((phase) => phase.mechanics).some((mechanic) => mechanic.iconId === guideId)).toBe(true);
      const url = `/ui/whetstorm/auras/${auraId}.webp`;
      expect(existsSync(`public${url}`)).toBe(true);
      expect(raidGuideAuraArtUrl(guideId)).toBe(url);
      expect(iconDataUrl('ability', guideId, 48)).toBe(url);
    }
  });
  it('does not claim unrelated, retired, or partial identities', () => {
    for (const id of ['raid_nythraxis_bone_storm', 'raid_nythraxis_bone_spike', 'raid_varkhul_crucible_beam', 'raid_ignivar_brand_extra', '../raid_ignivar_brand', '']) {
      expect(raidGuideAuraArtUrl(id)).toBeNull();
    }
  });
});
