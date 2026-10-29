import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'boundstone_helm',
  'boundstone_girdle',
  'gravewyrm_mantle',
  'gravewyrm_gauntlets',
  'mirewarden_jerkin',
  'mirewarden_leggings',
  'mirewarden_treads',
  'briarstep_jerkin',
  'conjured_water3',
  'conjured_water4',
  'conjured_bread3',
  'conjured_bread4',
  'mother_of_pearl',
  'tidewatchers_locket',
  'order_prayer_beads',
  'rift_watchers_band',
  'fine_sunpetal_herb',
  'brook_carrot',
  'fine_brook_carrot',
  'bog_beet',
  'ogre_war_totem',
  'wyrmcult_orders',
  'ritual_phylactery',
  'vanguard_bone',
];

describe('third set of item painting batches', () => {
  it('routes live IDs through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
