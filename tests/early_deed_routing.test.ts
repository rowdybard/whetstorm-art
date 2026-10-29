import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

describe('early deed art routing', () => {
  it('uses the original paintings through the actual deed crest lookup', () => {
    for (const id of [
      'exp_first_ore',
      'exp_first_timber',
      'exp_first_herb',
      'chr_vale_first_cast',
    ]) {
      expect(DEEDS[id]).toBeDefined();
      const crest = deedCrestId(id, DEEDS[id].category);
      const expected = `/ui/whetstorm/deeds/${id}.webp`;
      expect(crest).toBe(`deed_${id}`);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(expected);
      expect(iconDataUrl('crest', crest)).toBe(expected);
    }
    expect(deedImageUrl('deed_nonexistent')).toBeNull();
    expect(deedImageUrl('../exp_first_ore')).toBeNull();
  });
});
