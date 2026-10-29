import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'linen_pouch',
  'travelers_knapsack',
  'raw_mirror_trout',
  'raw_marsh_pike',
  'ridgestalker_treads',
  'stormshard_leggings',
  'revenant_silk_robe',
  'korgaths_chainwraps',
  'siltstep_leggings',
  'litany_gloves_rog',
  'litany_leather_chest',
  'drownstep_treads',
  'cooking_salt',
  'prime_cut',
  'highland_barley',
  'frost_gourd',
  'silverleaf_healing_draught',
  'silverleaf_mana_draught',
  'elixir_of_the_boar',
  'goldleaf_healing_draught',
];

describe('saved item painting batches', () => {
  it('routes live IDs through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
