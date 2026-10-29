import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('thirteenth resumed original art checkpoint', () => {
  it('routes weapons, armor and crafted scrolls through the game lookup', () => {
    for (const id of [
      'anvilguard_blade',
      'heart_of_the_end_greatblade',
      'dawnforged_helmet',
      'dawnforged_shoulder',
      'dawnforged_chest',
      'dawnforged_gloves',
      'dawnforged_legs',
      'silverleaf_scroll',
      'goldleaf_scroll',
      'sunpetal_scroll',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
