import { describe, expect, it } from 'vitest';
import {
  itemOffhandModelUrl,
  itemWeaponModelUrl,
  itemWeaponModelUrls,
} from '../src/render/characters/manifest';
import { ITEMS } from '../src/sim/data';

describe('Marrowpoint held model', () => {
  it('uses the existing KayKit dagger in either hand and preloads it', () => {
    const url = 'models/weapons/adv_dagger.glb';
    expect(ITEMS.marrowpoint?.kind).toBe('weapon');
    expect(itemWeaponModelUrl('marrowpoint')).toBe(url);
    expect(itemOffhandModelUrl('marrowpoint')).toBe(url);
    expect(itemWeaponModelUrls()).toContain(url);
    expect(itemWeaponModelUrls()).not.toContain('models/weapons/redskull_dagger.glb');
  });

  it('uses the same model for every existing heroic variant of Marrowpoint', () => {
    for (const item of Object.values(ITEMS).filter((item) => item.heroicOf === 'marrowpoint')) {
      expect(itemWeaponModelUrl(item.id)).toBe('models/weapons/adv_dagger.glb');
      expect(itemOffhandModelUrl(item.id)).toBe('models/weapons/adv_dagger.glb');
    }
  });
});
