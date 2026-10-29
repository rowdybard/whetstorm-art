import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('fourth resumed original art checkpoint', () => {
  it('routes item art through the game lookup', () => {
    for (const id of [
      'bonewrought_greatsword',
      'direfang_greatblade',
      'vanguard_band_of_might',
      'vanguard_band_of_precision',
      'vanguard_band_of_focus',
      'vanguard_band_of_mending',
      'necromancers_starshroud',
      'necromancers_soulsteps',
      'necromancers_soulspire_mantle',
      'thick_winter_pelt',
      'ridge_stalker_pelt',
      'plump_fen_eel',
      'slagbreaker_helmet',
      'slagbreaker_shoulder',
      'slagbreaker_chest',
      'slagbreaker_gloves',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes experience crests', () => {
    for (const id of ['prog_veteran', 'prog_champion', 'prog_paragon']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes warfare status images', () => {
    for (const id of [
      'set_warfare_ashen_step',
      'set_warfare_emberward',
      'set_warfare_thornguard',
      'set_warfare_unbroken_oath',
    ]) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
