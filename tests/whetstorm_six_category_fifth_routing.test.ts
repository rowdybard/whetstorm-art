import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'highwatch_wallshield',
  'highwatch_breastplate',
  'cragward_pauldrons',
  'stormchant_gauntlets',
  'cragmaw_prowlboots',
  'cragmaw_huntcord',
  'nightwalk_jerkin',
  'shadowmeld_tunic',
  'fenbridge_rye',
  'marsh_mint_tea',
  'smoked_eel',
  'silvermist_cordial',
  'champion_rift_band',
  'riftwardens_pendant',
  'champion_dawn_medallion',
  'champions_dawn_loop',
  'fine_vale_wheat',
  'brook_carrot_seed',
  'fine_bog_beet',
  'bog_beet_seed',
  'ps_castaway_crate',
  'ps_passing_stone',
  'ps_briny_lure',
  'firebottle',
];

describe('fifth set of item painting batches', () => {
  it('routes live IDs through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
