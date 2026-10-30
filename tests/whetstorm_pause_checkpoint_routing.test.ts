import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { professionImageUrl } from '../src/ui/hud/professions/profession_art';
import { iconDataUrl, itemImageUrl, professionIconUrl } from '../src/ui/icons';

describe('art pause checkpoint routing', () => {
  it('routes original item images', () => {
    for (const id of [
      'voidsong_dirk',
      'duskwhisper',
      'reins_grag_bear',
      'reins_stalkglider_snail',
      'reins_shadowjump_toad',
      'sigil_anvil_helmet',
      'sigil_anvil_shoulder',
      'sigil_anvil_chest',
      'sigil_anvil_gloves',
      'sigil_anvil_legs',
      'slagsnare_helmet',
      'slagsnare_shoulder',
      'slagsnare_chest',
      'slagsnare_gloves',
      'slagsnare_legs',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes five crafting professions', () => {
    for (const id of [
      'prof_inscription',
      'prof_jewelcrafting',
      'prof_leatherworking',
      'prof_tailoring',
      'prof_weaponcrafting',
    ]) {
      expect(professionImageUrl(id)).toBe(`/ui/whetstorm/professions/${id}.webp`);
      expect(professionIconUrl(id)).toBe(`/ui/whetstorm/professions/${id}.webp`);
    }
  });
  it('routes combat victory crests', () => {
    for (const id of ['cmb_legion_of_one', 'cmb_giantslayer']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
});
