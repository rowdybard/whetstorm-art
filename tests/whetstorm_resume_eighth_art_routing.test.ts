import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('eighth resumed original art checkpoint', () => {
  it('routes item art through the game lookup', () => {
    for (const id of [
      'greatfang_of_the_basin',
      'scepter_of_the_deathless_court',
      'deathless_greatblade',
      'stormcallers_focus',
      'gravewoven_bag',
      'mistcallers_duffel',
      'necromancers_reagent_satchel',
      'raw_deepbarb_catfish',
      'raw_hollowgill_sturgeon',
      'raw_stillmere_salmon',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes hunter aura art including shared rally effects', () => {
    for (const id of ['hunter_enduring_courser_burst', 'hunter_predators_pace']) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
    for (const id of [
      'hunter_pack_rally_speed',
      'hunter_pack_rally_haste',
      'hunter_pack_rally_spellhaste',
    ]) {
      expect(iconDataUrl('aura', id)).toBe('/ui/whetstorm/auras/hunter_pack_rally.webp');
    }
  });
});
