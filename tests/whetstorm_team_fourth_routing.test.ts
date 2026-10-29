import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { ITEMS } from '../src/sim/data';
import { deedCrestId } from '../src/ui/deeds_view';
import { auraImageUrl, deedImageUrl, iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('team fourth batch routing', () => {
  it('routes live items to their individual paintings', () => {
    for (const id of [
      'gravewyrm_claws',
      'gravescale_girdle',
      'mistforged_pauldrons',
      'frost_lentils',
      'gilded_yam',
      'evergarden_pumpkin',
      'gilded_sunmelon',
      'staff_of_velkhar',
    ]) {
      expect(ITEMS[id]).toBeDefined();
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes live deed crests through the public interface', () => {
    for (const id of [
      'chr_marsh_gatherer',
      'exp_the_last_keep',
      'exp_dawnhold_castle',
      'exp_windrider_slalom',
    ]) {
      expect(DEEDS[id]).toBeDefined();
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(crest).toBe(`deed_${id}`);
      expect(deedImageUrl(crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
      expect(iconDataUrl('crest', crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
    }
  });
  it('routes both runtime and family mob aura identities', () => {
    for (const [id, family] of [
      ['stoneskin_ancient_guardian', 'mob_stoneskin'],
      ['stoneskin_marrowlord_varkas', 'mob_stoneskin'],
      ['stoneskin_old_marrowshell', 'mob_stoneskin'],
      ['stoneskin_rift_boss_arcane', 'mob_stoneskin'],
      ['stoneskin_rift_boss_frost', 'mob_stoneskin'],
      ['stoneskin_sump_troll_devourer', 'mob_stoneskin'],
      ['stoneskin_thunzharr_waking_peak', 'mob_stoneskin'],
      ['stun_mogger_lackey', 'mob_stun_on_hit'],
      ['stun_rift_stone_ogre', 'mob_stun_on_hit'],
      ['warcry_deepfen_murloc', 'mob_warcry'],
      ['warcry_wildheart_beastmaster', 'mob_warcry'],
      ['ward_grave_silt_bulwark', 'mob_ward_allies'],
      ['ward_mogger', 'mob_ward_allies'],
      ['ward_treant_elder', 'mob_ward_allies'],
      ['ward_wildheart_beastmaster', 'mob_ward_allies'],
    ]) {
      const url = `/ui/whetstorm/auras/${family}.webp`;
      expect(auraImageUrl(id)).toBe(url);
      expect(auraImageUrl(family)).toBe(url);
      expect(iconDataUrl('aura', id)).toBe(url);
    }
  });
});
