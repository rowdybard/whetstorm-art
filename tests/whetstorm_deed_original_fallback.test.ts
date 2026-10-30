import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { DEED_IMAGE_IDS } from '../src/ui/deed_image_ids';
import {
  DEED_BESPOKE_CRESTS,
  deedCrestHasPaintedArt,
  deedCrestId,
  deedDisplayCategory,
} from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, hasCrestRecipe } from '../src/ui/icons';
import { reliquaryCellArtOpaque } from '../src/ui/reliquary_cell_art';

describe('original deed crest routing', () => {
  it('routes every live inherited image through original art or a procedural category', () => {
    let inheritedWithoutOriginal = 0;
    for (const [id, deed] of Object.entries(DEEDS)) {
      const original = earlyDeedImageUrl(id);
      const crest = deedCrestId(id, deed.category);
      if (original) {
        expect(crest).toBe(`deed_${id}`);
        expect(deedImageUrl(crest)).toBe(original);
        expect(deedCrestHasPaintedArt(crest)).toBe(true);
        expect(reliquaryCellArtOpaque({ kind: 'crest', crestId: crest })).toBe(true);
      } else if (DEED_IMAGE_IDS.has(id)) {
        inheritedWithoutOriginal++;
        expect(crest).toBe(`deed_cat_${deedDisplayCategory(deed.category)}`);
        expect(hasCrestRecipe(crest)).toBe(true);
        expect(deedImageUrl(`deed_${id}`)).toBeNull();
        expect(deedCrestHasPaintedArt(`deed_${id}`)).toBe(false);
        expect(reliquaryCellArtOpaque({ kind: 'crest', crestId: crest })).toBe(true);
      } else if (DEED_BESPOKE_CRESTS.has(id)) {
        expect(crest).toBe(`deed_${id}`);
        expect(deedCrestHasPaintedArt(crest)).toBe(false);
      }
    }
    expect(inheritedWithoutOriginal).toBeGreaterThan(0);
  });
});
