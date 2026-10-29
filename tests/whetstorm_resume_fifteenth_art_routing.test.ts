import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('fifteenth resumed original art checkpoint', () => {
  it('routes supplies and weapons through the game lookup', () => {
    for (const id of [
      'staff_of_the_last_spring',
      'forgefire_spire',
      'cartographers_ink',
      'lucent_reagent',
      'deed_of_making',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes shared elemental effects', () => {
    for (const id of ['convergence_cd', 'convergence_mark', 'elemental_convergence']) {
      expect(iconDataUrl('aura', id)).toBe('/ui/whetstorm/auras/elemental_convergence.webp');
    }
    for (const id of ['shaman_stormcast', 'shaman_stormcast_cheap']) {
      expect(iconDataUrl('aura', id)).toBe('/ui/whetstorm/auras/shaman_stormcast.webp');
    }
    expect(iconDataUrl('aura', 'shaman_wayfarer_grace')).toBe(
      '/ui/whetstorm/auras/shaman_wayfarer_grace.webp',
    );
  });
});
