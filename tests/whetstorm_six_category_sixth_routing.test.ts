import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'boneplate_vest',
  'drogmar_warboots',
  'marrowlord_boneboots',
  'boneguard_breastplate',
  'litany_legs',
  'litany_cloth_chest',
  'litany_helm',
  'tidewatchers_wraps',
  'highwatch_barley_bannock',
  'highwatch_gourd_soup',
  'trail_hardtack',
  'meltwater_flask',
  'seal_of_the_nine_oaths',
  'nielas_coldlight_band',
  'sutils_gambit',
  'oath_of_the_round_table',
  'homespun_cloth',
  'arcane_shard',
  'arcane_essence',
  'arcane_dust',
  'clue_scroll',
  'treasure_casket',
  'captains_crest',
  'priests_sigil',
];

describe('sixth set of item painting batches', () => {
  it('routes live IDs through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
