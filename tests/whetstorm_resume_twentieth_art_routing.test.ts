import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('twentieth resumed original art checkpoint', () => {
  it('routes Zealfire armor', () => {
    for (const id of [
      'zealfire_helmet',
      'zealfire_shoulder',
      'zealfire_chest',
      'zealfire_gloves',
      'zealfire_legs',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes shaman cooldown identities', () => {
    for (const id of [
      'shaman_ancestral_bulwark_icd',
      'shaman_gathering_winds_icd',
      'shaman_wayfarer_grace_icd',
    ]) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
