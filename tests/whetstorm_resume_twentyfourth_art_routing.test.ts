import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('twenty-fourth resumed original art checkpoint', () => {
  it('routes books, trophies, armor and weapons', () => {
    for (const id of [
      'vanguard_verdict_greatsword',
      'vanguard_oath_blade',
      'guardian_core',
      'gleamstag_charm',
      'cracked_wyrm_scale',
      'silverleaf_primer',
      'goldleaf_folio',
      'sunpetal_grimoire',
      'packlord_emberhide_helmet',
      'packlord_emberhide_shoulder',
      'packlord_emberhide_chest',
      'packlord_emberhide_gloves',
      'packlord_emberhide_legs',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
