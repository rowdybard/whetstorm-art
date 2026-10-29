import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('tenth resumed original art checkpoint', () => {
  it('routes feasts, bags and weapons through the game lookup', () => {
    for (const id of [
      'stonepot_feast',
      'warspice_feast',
      'sageleaf_feast',
      'harvest_feast',
      'rift_surveyors_satchel',
      'clockwork_tinkers_pack',
      'allied_vanguard_duffel',
      'varkhul_forgebreaker',
      'forgefathers_warhammer',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
