import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('nineteenth resumed original art checkpoint', () => {
  it('routes seeds and weapons', () => {
    for (const id of [
      'gilded_sunmelon_seed',
      'evergarden_greens_seed',
      'gilded_yam_seed',
      'evergarden_pumpkin_seed',
      'elderwood_battle_staff',
      'final_argument_greatblade',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes crypt challenge crests', () => {
    for (const id of ['dgn_morthen_flawless', 'dgn_morthen_trio', 'dgn_olen_arc']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
});
