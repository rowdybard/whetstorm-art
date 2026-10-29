import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'siltguard_helm',
  'bulwark_rusted_pauldrons',
  'blackwater_vanguard_chest',
  'cryptplate_helm',
  'reliquary_leather_chest',
  'reliquary_gloves_rog',
  'reedstalker_jerkin',
  'widow_silk_hood',
  'fenbridge_beet_braise',
  'fenbridge_rice_pudding',
  'glacier_melt',
  'highwatch_barley_porridge',
  'dawnkeepers_circle',
  'champion_forged_loop',
  'forgewall_gorget',
  'wyrmfall_pendant',
  'fine_thorium_ore',
  'elderwood_log',
  'fine_elderwood_log',
  'arcanite_bar',
  'wardens_seal',
  'duskwisp_essence',
  'spore_heart',
  'wisp_mote',
];

describe('seventh set of item painting batches', () => {
  it('routes live IDs through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
