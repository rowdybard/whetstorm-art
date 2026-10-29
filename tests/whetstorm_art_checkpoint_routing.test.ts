import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const items = [
  'outrider_sabatons',
  'thoriumscale_greathelm',
  'thoriumscale_cuirass',
  'thoriumscale_leggings',
  'stalkerhide_jerkin',
  'cragwalker_boots',
  'windguard_leggings',
  'wildgrove_cinch',
  'peppered_deepbarb_catfish',
  'roast_hollowgill_sturgeon',
  'evergarden_sunmelon_tart',
  'evergarden_harvest_platter',
  'cogwheel_blank',
  'sharp_claw',
  'pristine_venom_gland',
  'resonant_thread',
  'treasure_map_common',
  'treasure_map_rare',
  'treasure_map_epic',
  'treasure_map_legendary',
];

describe('item and deed painting checkpoint', () => {
  it('routes live items through both public image APIs', () => {
    for (const id of items) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
