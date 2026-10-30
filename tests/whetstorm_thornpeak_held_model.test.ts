import { describe, expect, it } from 'vitest';
import {
  itemOffhandModelUrl,
  itemWeaponModelUrl,
  itemWeaponModelUrls,
} from '../src/render/characters/manifest';
import { ITEMS } from '../src/sim/data';
import { courtierWardItemImageUrl } from '../src/ui/courtier_ward_item_art';
import { ITEM_WEAPON_VARIANTS } from '../src/ui/weapon_variants';

describe('Thornpeak Wardblade held model', () => {
  const url = 'models/weapons/adv_sword_1handed.glb';

  it('resolves the KayKit sword in either hand and preloads it', () => {
    expect(ITEMS.thornpeak_wardblade?.kind).toBe('weapon');
    expect(itemWeaponModelUrl('thornpeak_wardblade')).toBe(url);
    expect(itemOffhandModelUrl('thornpeak_wardblade')).toBe(url);
    expect(itemWeaponModelUrls()).toContain(url);
    expect(itemWeaponModelUrls()).not.toContain('models/weapons/purple_sword.glb');
  });

  it('inherits the base model for every existing heroic copy', () => {
    const heroics = Object.values(ITEMS).filter((item) => item.heroicOf === 'thornpeak_wardblade');
    expect(ITEMS.heroic_thornpeak_wardblade?.heroicOf).toBe('thornpeak_wardblade');
    for (const item of heroics) {
      expect(ITEM_WEAPON_VARIANTS).not.toHaveProperty(item.id);
      expect(itemWeaponModelUrl(item.id)).toBe(url);
      expect(itemOffhandModelUrl(item.id)).toBe(url);
    }
  });

  it('retains the item painting', () => {
    expect(courtierWardItemImageUrl('thornpeak_wardblade')).toBe(
      '/ui/whetstorm/items/thornpeak_wardblade.webp',
    );
  });
});
