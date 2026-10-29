import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { ITEMS } from '../src/sim/data';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { auraImageUrl, deedImageUrl, iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('team third batch routing', () => {
  it('routes live items to their own paintings', () => {
    for (const id of [
      'bonechill_striders',
      'bonechill_cord',
      'sanctum_prowlers_grips',
      'prismglass_setting',
      'precision_chassis',
      'quickening_catalyst',
      'sablewax_vellum',
      'drogmars_skullcleaver',
      'ogre_bonecharm_staff',
      'gutripper_shiv',
    ]) {
      expect(ITEMS[id]).toBeDefined();
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes journey crests even when they formerly used a category fallback', () => {
    for (const id of [
      'exp_long_road_north',
      'exp_world_traveler',
      'exp_clue_first_casket',
      'exp_harbor_to_harbor',
    ]) {
      expect(DEEDS[id]).toBeDefined();
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(crest).toBe(`deed_${id}`);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
      expect(iconDataUrl('crest', crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
    }
  });
  it('routes exact runtime and family aura identities', () => {
    for (const [id, family] of [
      ['smolder_ironvein_sapper', 'mob_smolder'],
      ['smolder_rift_hellguard', 'mob_smolder'],
      ['smolder_rift_magma_brute', 'mob_smolder'],
      ['soulrot_restless_bones', 'mob_soulrot'],
      ['soulrot_rift_boss_necro', 'mob_soulrot'],
      ['soulrot_rift_boss_ritualist', 'mob_soulrot'],
      ['soulrot_rift_pact_acolyte', 'mob_soulrot'],
      ['venom_duskwisp', 'mob_venom'],
      ['venom_old_marrowshell', 'mob_venom'],
      ['venom_rift_venom_weaver', 'mob_venom'],
      ['venom_webwood_spider', 'mob_venom'],
      ['vulnerability_gravecaller_cultist', 'mob_vulnerability'],
    ]) {
      const url = `/ui/whetstorm/auras/${family}.webp`;
      expect(auraImageUrl(id)).toBe(url);
      expect(auraImageUrl(family)).toBe(url);
      expect(iconDataUrl('aura', id)).toBe(url);
    }
  });
});
