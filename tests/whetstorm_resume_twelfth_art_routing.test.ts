import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('twelfth resumed original art checkpoint', () => {
  it('routes original items', () => {
    for (const id of [
      'cinderfang_kris',
      'slagrender_cleaver',
      'ironhusk_flask',
      'warboar_flask',
      'runewater_flask',
      'burlap_reagent_pouch',
      'foragers_haversack',
      'loombound_reagent_satchel',
      'sunspun_haversack',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes delve companion crests', () => {
    for (const id of ['dlv_companion_max', 'dlv_companions_both', 'dlv_solo_heroic']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes combat effects, including the shared water jet painting', () => {
    for (const id of ['fear_incap', 'boneglass_cut', 'marrowpoint_rend', 'water_jet']) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
    expect(iconDataUrl('aura', 'water_jet_slow')).toBe('/ui/whetstorm/auras/water_jet.webp');
  });
});
