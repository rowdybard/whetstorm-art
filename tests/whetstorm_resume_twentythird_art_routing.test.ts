import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('twenty-third resumed original art checkpoint', () => {
  it('routes portable profession stations', () => {
    for (const id of ['masters_field_forge', 'grand_cauldron', 'laden_hearth']) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes sanctum challenge crests', () => {
    for (const id of ['dgn_velkhar_bonewalkers', 'dgn_korzul_flawless', 'dgn_sanctum_speed']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
});
