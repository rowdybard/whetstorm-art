import { expect, it } from 'vitest';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { abilityImageUrl, auraImageUrl, deedImageUrl, iconDataUrl } from '../src/ui/icons';

it('routes the new early class paintings', () => {
  for (const id of [
    'lightning_bolt',
    'rockbiter_weapon',
    'healing_wave',
    'earth_shock',
    'sinister_strike',
    'eviscerate',
    'backstab',
    'stealth',
    'holy_light',
    'hammer_of_grace',
    'divine_ascension',
    'dawn_devotion',
  ]) {
    const url = `/ui/whetstorm/abilities/${id}.webp`;
    expect(abilityImageUrl(id)).toBe(url);
    expect(iconDataUrl('ability', id)).toBe(url);
  }
});

it('routes the new encounter aura paintings', () => {
  for (const id of [
    'ignivar_brand_of_the_pyre',
    'ignivar_molten_armor',
    'ignivar_last_inferno',
    'nythraxis_bone_storm',
  ]) {
    const url = `/ui/whetstorm/auras/${id}.webp`;
    expect(auraImageUrl(id)).toBe(url);
    expect(iconDataUrl('aura', id)).toBe(url);
  }
});

it('routes the new chronicle deed paintings', () => {
  for (const id of [
    'chr_willowfen_first_cast',
    'chr_willowfen_gatherer',
    'chr_galecrest_first_cast',
    'chr_galecrest_gatherer',
  ]) {
    const crest = deedCrestId(id, 'chronicle');
    const url = `/ui/whetstorm/deeds/${id}.webp`;
    expect(deedCrestHasPaintedArt(crest)).toBe(true);
    expect(deedImageUrl(crest)).toBe(url);
    expect(iconDataUrl('crest', crest)).toBe(url);
  }
});
