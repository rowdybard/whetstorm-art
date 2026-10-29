import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('twenty-second resumed original art checkpoint', () => {
  it('routes weapons and fine produce', () => {
    for (const id of [
      'first_blood_razor',
      'emberglass_warstaff',
      'fine_gilded_sunmelon',
      'fine_evergarden_greens',
      'seasoned_stock',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes the moderation mark', () => {
    expect(iconDataUrl('aura', 'cheater_mark')).toBe('/ui/whetstorm/auras/cheater_mark.webp');
  });
});
