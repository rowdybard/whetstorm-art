import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { leatherThornpeakItemImageUrl } from '../src/ui/leather_thornpeak_item_art';

const ids = ['cragmaw_prowlboots', 'cragmaw_huntcord', 'nightwalk_jerkin', 'shadowmeld_tunic'];

describe('Thornpeak leather original art', () => {
  it('maps current leather items to their individual images', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.armorType).toBe('leather');
      expect(leatherThornpeakItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(leatherThornpeakItemImageUrl('../nightwalk_jerkin')).toBeNull();
  });
});
