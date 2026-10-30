import { describe, expect, it } from 'vitest';
import {
  itemOffhandModelUrl,
  itemWeaponModelUrl,
  itemWeaponModelUrls,
} from '../src/render/characters/manifest';
import { ITEMS } from '../src/sim/data';
import { courtierWardItemImageUrl } from '../src/ui/courtier_ward_item_art';
import { voidDuskItemImageUrl } from '../src/ui/void_dusk_item_art';

describe('Duskwhisper and Courtier held models', () => {
  const url = 'models/weapons/adv_dagger.glb';
  it('resolves the cleared dagger for each base item in either hand', () => {
    for (const id of ['duskwhisper', 'courtiers_bonefang']) {
      expect(ITEMS[id]?.kind).toBe('weapon');
      expect(itemWeaponModelUrl(id)).toBe(url);
      expect(itemOffhandModelUrl(id)).toBe(url);
    }
    expect(itemWeaponModelUrls()).toContain(url);
    expect(itemWeaponModelUrls()).not.toContain('models/weapons/purple_dagger.glb');
  });

  it('inherits the model for existing heroic variants', () => {
    expect(ITEMS.heroic_duskwhisper?.heroicOf).toBe('duskwhisper');
    for (const item of Object.values(ITEMS).filter((item) =>
      ['duskwhisper', 'courtiers_bonefang'].includes(item.heroicOf ?? ''),
    )) {
      expect(itemWeaponModelUrl(item.id)).toBe(url);
      expect(itemOffhandModelUrl(item.id)).toBe(url);
    }
  });

  it('retains each item painting', () => {
    expect(voidDuskItemImageUrl('duskwhisper')).toBe('/ui/whetstorm/items/duskwhisper.webp');
    expect(courtierWardItemImageUrl('courtiers_bonefang')).toBe(
      '/ui/whetstorm/items/courtiers_bonefang.webp',
    );
  });
});
