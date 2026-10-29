import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

describe('exploration activity crest routing', () => {
  it('routes each live deed through the public crest interface', () => {
    for (const id of [
      'exp_arcane_calligraphy',
      'exp_forge_helper',
      'exp_duskweave_dispatches',
      'exp_wisp_maze',
    ]) {
      expect(DEEDS[id]).toMatchObject({ category: 'exploration' });
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(crest).toBe(`deed_${id}`);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
      expect(iconDataUrl('crest', crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
    }
  });
});
