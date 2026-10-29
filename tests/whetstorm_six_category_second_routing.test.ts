import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'roadwardens_helm',
  'reinforced_pauldrons',
  'outrider_brigandine',
  'outrider_legguards',
  'sableweb_cord',
  'caravan_quilted_vest',
  'pilgrims_leggings',
  'sunspun_handwraps',
  'vale_hearth_loaf',
  'eastbrook_root_pottage',
  'eastbrook_glazed_carrots',
  'fenbridge_rice_bowl',
  'etched_iron_loop',
  'iron_link_choker',
  'weighted_thorium_band',
  'gleaming_thorium_loop',
  'pristine_hide',
  'goldleaf_herb',
  'sunpetal_herb',
  'fine_goldleaf_herb',
  'wisplight_globe',
  'fenway_mooring_line',
  'bridgemere_toll_chest',
  'amberfall_sap_bucket',
];

describe('six more item painting batches', () => {
  it('routes each live ID through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
