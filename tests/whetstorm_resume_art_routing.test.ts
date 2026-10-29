import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('resumed original art routing', () => {
  it('shows original item paintings through the public UI lookup', () => {
    for (const id of [
      'sundered_essence',
      'rift_essence',
      'skullsplitter_dirk',
      'stormcallers_crown',
      'stormcallers_spaulders',
      'stormcallers_handguards',
      'stormcallers_waistguard',
      'ps_lustrous_pearl',
      'palecoil_heartscale',
      'emberwing_scale',
      'bramblehide_crown',
      'bramblehide_mantle',
      'bramblehide_grips',
      'bramblehide_treads',
      'wyrmfang_greatblade',
      'staff_of_the_gravewyrm',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });

  it('shows the new progression crests', () => {
    for (const id of [
      'prog_the_long_middle',
      'prog_level_cap',
      'prog_deep_roots',
      'prog_mining_100',
      'prog_logging_100',
      'prog_herbalism_100',
    ]) {
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(iconDataUrl('crest', crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
    }
  });

  it('shows recovery status art for exact aura identities', () => {
    for (const id of [
      'resurrection_sickness',
      'sated',
      'unstuck_sickness',
      'affliction_doom',
      'icicles',
      'soul_fragments',
      'winters_chill',
    ]) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
