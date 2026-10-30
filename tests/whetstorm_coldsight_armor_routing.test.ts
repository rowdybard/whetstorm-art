import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('Coldsight armor original painting routing', () => {
  it('routes the live item identities', () => {
    for (const id of [
      'coldsight_trackers_helmet',
      'coldsight_trackers_shoulder',
      'coldsight_trackers_chest',
      'coldsight_trackers_gloves',
      'coldsight_trackers_legs',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
