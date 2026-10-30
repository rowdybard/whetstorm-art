import { expect, it } from 'vitest';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { abilityImageUrl, auraImageUrl, deedImageUrl, iconDataUrl } from '../src/ui/icons';

it('routes the new class ability paintings', () => {
  for (const id of [
    'fireball',
    'frostbolt',
    'arcane_missiles',
    'blink',
    'smite',
    'power_word_shield',
    'renew',
    'mind_blast',
    'measured_shot',
    'pack_command',
    'frostjaw_trap',
    'trailbreak',
  ]) {
    const expected = `/ui/whetstorm/abilities/${id}.webp`;
    expect(abilityImageUrl(id)).toBe(expected);
    expect(iconDataUrl('ability', id)).toBe(expected);
  }
});

it('routes the new Varkhul encounter aura paintings', () => {
  for (const id of [
    'varkhul_makers_brand',
    'varkhul_cinder_orbs',
    'varkhul_red_hot_metal',
    'varkhul_masters_assembly',
  ]) {
    const expected = `/ui/whetstorm/auras/${id}.webp`;
    expect(auraImageUrl(id)).toBe(expected);
    expect(iconDataUrl('aura', id)).toBe(expected);
  }
});

it('routes the new rare gathering deed paintings', () => {
  for (const id of [
    'col_pristine_vein',
    'col_ancient_heartwood',
    'col_moonlit_bloom',
    'col_perfect_specimen',
  ]) {
    const crest = deedCrestId(id, 'collection');
    const expected = `/ui/whetstorm/deeds/${id}.webp`;
    expect(deedCrestHasPaintedArt(crest)).toBe(true);
    expect(deedImageUrl(crest)).toBe(expected);
    expect(iconDataUrl('crest', crest)).toBe(expected);
  }
});
