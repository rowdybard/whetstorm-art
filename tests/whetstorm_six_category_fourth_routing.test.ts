import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'sootscale_mantle',
  'reliquary_plate_chest',
  'reliquary_helm',
  'reliquary_shoulder',
  'reliquary_cloth_chest',
  'reliquary_legs',
  'cantors_drowned_sash',
  'tidehymn_slippers',
  'frostgill_chowder',
  'silvered_carp_supper',
  'anglers_feast_platter',
  'marlows_grand_roast',
  'burnished_thorium_amulet',
  'acolytes_signet',
  'cogwork_choker',
  'automaton_cog_ring',
  'smithing_flux',
  'spool_of_thread',
  'tanning_agent',
  'glass_vial',
  'gravewyrm_sigil',
  'sanctum_key_shard',
  'runed_bone_shard',
  'royal_seal',
];

describe('fourth set of item painting batches', () => {
  it('routes live IDs through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
