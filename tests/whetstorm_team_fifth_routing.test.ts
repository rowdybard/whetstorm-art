import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { ITEMS } from '../src/sim/data';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { deedCrestId } from '../src/ui/deeds_view';
import {
  auraImageUrl,
  deedImageUrl,
  hasAbilityIconIdentity,
  hasAuraImageIdentity,
  iconDataUrl,
  itemImageUrl,
} from '../src/ui/icons';

describe('team fifth batch routing', () => {
  it('routes live items to their individual paintings', () => {
    for (const id of [
      'tidebound_spaulders',
      'tideguard_faceguard',
      'dreamroot_boots',
      'evergarden_greens',
      'fine_frost_lentils',
      'fine_gilded_yam',
      'fine_evergarden_pumpkin',
      'collapsar_band_of_nyxaris',
      'chained_ember_choker',
      'band_mountains_weight',
    ]) {
      expect(ITEMS[id]).toBeDefined();
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes live discovery deed crests', () => {
    for (const id of [
      'chr_peaks_glimmer_cast',
      'chr_peaks_moongate',
      'chr_peaks_waking_witness',
      'exp_clue_ten_caskets',
    ]) {
      expect(DEEDS[id]).toBeDefined();
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(crest).toBe(`deed_${id}`);
      expect(deedImageUrl(crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
      expect(iconDataUrl('crest', crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
    }
  });
  it('routes exact encounter auras through the aura-strip identity resolver', () => {
    for (const [id, family] of [
      ['stomp_stun', 'mob_encounter_stun'],
      ['brood_counter_stun', 'mob_encounter_stun'],
      ['brood_burn_hatchling_burn', 'mob_brood_burn'],
      ['brood_burn_seared_scales', 'mob_brood_burn'],
      ['brood_ward', 'mob_brood_ward'],
      ['nhalia_cantor_shield', 'mob_cantor_shield'],
    ]) {
      const url = `/ui/whetstorm/auras/${family}.webp`;
      expect(hasAuraImageIdentity(id)).toBe(true);
      expect(
        resolveAuraIconId(
          { id, kind: 'stun' },
          hasAbilityIconIdentity,
          () => false,
          hasAuraImageIdentity,
        ),
      ).toBe(id);
      expect(auraImageUrl(id)).toBe(url);
      expect(iconDataUrl('aura', id)).toBe(url);
    }
  });
});
