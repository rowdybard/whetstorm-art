import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'valeborn_spellblade',
  'crossroads_saber',
  'duskforged_warblade',
  'ridgebreaker',
  'acolytes_circlet',
  'embroidered_mantle',
  'silk_sash',
  'roughspun_gloves',
  'hollowbound_legguards',
  'bramblehide_jerkin',
  'wayfarers_hood',
  'sturdy_belt',
  'herbed_marsh_pike',
  'ashwood_smoked_eel',
  'goldleaf_game_stew',
  'conjured_bread2',
  'fine_iron_ore',
  'ashwood_log',
  'fine_ashwood_log',
  'thorium_ore',
  'highwatch_summons',
  'glowing_wax',
  'storm_core',
  'kazzix_heartshard',
];

describe('six item painting batches', () => {
  it('routes each real item through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
