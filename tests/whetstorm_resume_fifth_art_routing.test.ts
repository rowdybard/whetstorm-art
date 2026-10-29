import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('fifth resumed original art checkpoint', () => {
  it('routes item art through the game lookup', () => {
    for (const id of [
      'slagbreaker_legs',
      'emberfury_helmet',
      'emberfury_shoulder',
      'emberfury_chest',
      'highwatch_warblade',
      'highwatch_greatsword',
      'courtiers_bonefang',
      'thornpeak_wardblade',
      'riftbound_band_of_might',
      'riftbound_band_of_insight',
      'riftbound_band_of_guile',
      'heart_of_the_rift',
      'evergarden_bloom_clipping',
      'farshore_salt_moss',
      'galecrest_ram_wool',
      'breakscarred_steel',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes progression crests', () => {
    for (const id of [
      'prog_prestige',
      'prog_prestige_5',
      'prog_prestige_10',
      'prog_mythic',
      'prog_eternal',
      'prog_full_build',
    ]) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes set status images', () => {
    for (const id of ['set_gravemight', 'set_bonesplinter', 'set_fangrush', 'set_ragged_gash']) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
