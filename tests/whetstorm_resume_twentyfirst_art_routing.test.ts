import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('twenty-first resumed original art checkpoint', () => {
  it('routes profession accessories', () => {
    for (const id of ['gatherers_cache', 'artisans_eye', 'makers_charm']) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes flooded encounter crests', () => {
    for (const id of ['dgn_vael_thralls', 'dgn_ysolei_moonspawn', 'dgn_ysolei_flawless']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
});
