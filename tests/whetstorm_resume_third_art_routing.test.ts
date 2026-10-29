import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('third resumed original art checkpoint', () => {
  it('routes original item art through the game lookup', () => {
    for (const id of [
      'crownforged_dreadhelm',
      'crownforged_warspaulders',
      'crownforged_girdle',
      'nighttalon_crown',
      'nighttalon_shoulderguards',
      'nighttalon_grips',
      'nighttalon_waistband',
      'seal_of_the_forgewall',
      'band_of_marked_strikes',
      'circle_of_cinders',
      'loop_of_quiet_springs',
      'moonfleece_tuft',
      'widowsilk_skein',
      'canopy_silk_hank',
      'nightfangs_greatstaff',
      'maul_of_the_scourged_wilds',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes dungeon crests', () => {
    for (const id of ['dgn_hollow_crypt', 'dgn_sunken_bastion', 'dgn_drowned_temple']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes battleground and class status images', () => {
    for (const id of [
      'bg_battle_rune',
      'bg_sprint_rune',
      'bg_ward_rune',
      'bg_carried_flag',
      'moontide',
      'old_blood',
      'verdance',
      'destruction_ruin',
    ]) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
