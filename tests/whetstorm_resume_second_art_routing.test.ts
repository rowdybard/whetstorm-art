import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('second resumed original art checkpoint', () => {
  it('routes item images to the live UI', () => {
    for (const id of [
      'bramblehide_harness',
      'bramblehide_cinch',
      'bramblehide_legguards',
      'craghorn_staff',
      'icevein_dirk',
      'cragthorn_greatstaff',
      'gravewyrm_thornmaul',
      'gleaming_antler',
      'elder_bark',
      'starfall_shard',
      'aurora_mote',
      'blessed_embers',
      'gilded_sap_clot',
      'vanguard_pendant_of_might',
      'vanguard_pendant_of_precision',
      'vanguard_pendant_of_focus',
      'vanguard_pendant_of_mending',
      'pendant_of_the_first_tempering',
      'ignivars_ember_choker',
      'locket_of_the_last_flame',
      'heartspring_amulet',
      'soulflame_cowl',
      'soulflame_mantle',
      'soulflame_gloves',
      'soulflame_cord',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });

  it('routes combat and crafting crests', () => {
    for (const id of [
      'cmb_slayer',
      'cmb_heavy_hitter',
      'cmb_critical_eye',
      'prog_first_craft',
      'prog_craft_specialist',
      'prog_around_the_ring',
    ]) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });

  it('routes combat status images', () => {
    for (const id of ['battle_trance', 'cauterize_fatigue', 'cauterizing', 'heating_up']) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
