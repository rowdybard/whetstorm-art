import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('sixth resumed original art checkpoint', () => {
  it('routes original paintings through the game item lookup', () => {
    for (const id of [
      'emberfury_gloves',
      'emberfury_legs',
      'forgewall_helmet',
      'forgewall_shoulder',
      'gravecourt_hewer',
      'fang_of_korzul',
      'marrowpoint',
      'riftwarden_voidblade',
      'unbroken_circle',
      'fleetblood_band',
      'last_step_signet',
      'ashen_focus_ring',
      'spellbreakers_seal',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
