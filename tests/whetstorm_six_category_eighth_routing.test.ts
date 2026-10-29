import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'litany_shoulder',
  'litany_plate_chest',
  'deacon_reliquary_helm',
  'morthens_cryptforged_hauberk',
  'peakwool_robe',
  'shardsong_mantle',
  'wyrmcult_spellgrips',
  'drownstep_slippers',
  'roast_mountain_goat',
  'stonepot_stew',
  'warspice_skewers',
  'sageleaf_chowder',
  'final_oath_medallion',
  'razorwind_torque',
  'cinder_sigil_pendant',
  'iron_vow_band',
  'pristine_silk',
  'venom_gland',
  'curved_tusk',
  'pristine_claw',
  'crypt_keystone',
  'moongate_rubbing',
  'drowned_offering',
  'hedgewick_shears',
];

describe('eighth set of item painting batches', () => {
  it('routes live IDs through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
