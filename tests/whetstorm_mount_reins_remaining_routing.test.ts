import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('remaining mount item art routing', () => {
  it('routes the obtainable mount identities', () => {
    for (const id of [
      'reins_valorsteed',
      'reins_avian_strider',
      'reins_lanternback_troll',
      'reins_stormfeather_griffin',
      'reins_thunderstrut_gobbler',
      'reins_aether_hover_cycle',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
