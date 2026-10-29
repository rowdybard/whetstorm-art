import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'gravewyrm_sabatons',
  'deathlord_legguards',
  'deathlord_warplate',
  'deathlords_dread_visage',
  'wyrmscale_jerkin',
  'gravewyrm_stalkers_treads',
  'wyrmshadow_harness',
  'wyrmshadow_treads',
  'evergarden_braised_greens',
  'compost',
  'growth_tonic',
  'marsh_rice_seed',
  'fine_marsh_rice',
  'kings_signet',
  'ashbone_war_brand',
];

describe('new item painting checkpoint', () => {
  it('routes live IDs through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
