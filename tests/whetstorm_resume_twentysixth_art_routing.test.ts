import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('twenty-sixth resumed original art checkpoint', () => {
  it('routes regional loot and weapons', () => {
    for (const id of [
      'ogre_toe_ring',
      'inert_storm_shard',
      'frayed_prayer_beads',
      'soggy_moccasin',
      'deepfen_pearl',
      'last_keep_signet',
      'vanguard_feral_staff',
      'rimefang',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes the mountain boss crests', () => {
    for (const id of ['cmb_thunzharr', 'cmb_thunzharr_unbroken', 'cmb_thunzharr_ten']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
});
