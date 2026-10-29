import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('seventh resumed original art checkpoint', () => {
  it('routes item art through the game lookup', () => {
    for (const id of [
      'dawnkeeper_consecrated_mace',
      'forgemaster_crag_cleaver',
      'mistcallers_fang',
      'lunar_tide_greatstaff',
      'gravewyrm_cleaver',
      'wildsoul_maul',
      'abyssal_loop',
      'abysswrought_band',
      'raw_bog_eel',
      'raw_frostgill_trout',
      'raw_stonescale_carp',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes dungeon crests', () => {
    for (const id of ['dgn_gravewyrm_sanctum', 'dgn_nythraxis', 'dgn_thornpeak_rounds']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes shaman status images', () => {
    for (const id of [
      'shaman_ancestral_bulwark',
      'shaman_gathering_winds',
      'shaman_mending_current',
      'shaman_thunder_charges',
    ]) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
