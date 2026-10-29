import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { auraImageUrl, iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'goldleaf_mana_draught',
  'venomfire_elixir',
  'sunpetal_healing_draught',
  'sunpetal_mana_draught',
  'highland_barley_seed',
  'fine_highland_barley',
  'frost_gourd_seed',
  'fine_frost_gourd',
  'zyzzs_deathless_signet',
  'architects_cornerstone',
  'yumis_keepsake_locket',
  'zense_meridian',
  'sister_nhalia_choir_plate',
  'skullsmasher_warbelt',
  'emberwing_legguards',
  'gravewyrm_scale_hauberk',
  'shadowpulse_handwraps',
  'shadowpulse_slippers',
];

describe('item and aura painting checkpoint', () => {
  it('routes live items through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes well-fed through both aura image APIs', () => {
    expect(auraImageUrl('well_fed')).toBe('/ui/whetstorm/auras/well_fed.webp');
    expect(iconDataUrl('aura', 'well_fed')).toBe('/ui/whetstorm/auras/well_fed.webp');
  });
});
