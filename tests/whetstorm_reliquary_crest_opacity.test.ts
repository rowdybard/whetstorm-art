import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { RELIQUARY_HORIZON_TITLES } from '../src/sim/content/reliquary';
import { deedImageUrl } from '../src/ui/icons';
import { reliquaryCellArt, reliquaryCellArtOpaque } from '../src/ui/reliquary_cell_art';

describe('Reliquary crest background classification', () => {
  it('uses the winning original painting for Vale and an existing title', () => {
    for (const id of ['chr_vale_chapter_iii', 'prog_veteran']) {
      expect(RELIQUARY_HORIZON_TITLES).toContain(id);
      const art = reliquaryCellArt({ kind: 'title', id });
      expect(art).toEqual({ kind: 'crest', crestId: `deed_${id}` });
      expect(deedImageUrl(`deed_${id}`)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
      expect(art && reliquaryCellArtOpaque(art)).toBe(true);
    }
  });

  it('keeps inherited painted crests and procedural crests on their respective treatments', () => {
    const inherited = reliquaryCellArt({ kind: 'title', id: 'chr_peaks_chapter_iii' });
    expect(inherited).toEqual({ kind: 'crest', crestId: 'deed_chr_peaks_chapter_iii' });
    expect(deedImageUrl('deed_chr_peaks_chapter_iii')).toBe('/ui/deeds/chr_peaks_chapter_iii.webp');
    expect(inherited && reliquaryCellArtOpaque(inherited)).toBe(false);
    expect(reliquaryCellArtOpaque({ kind: 'crest', crestId: 'deed_cat_chronicle' })).toBe(true);
    expect(reliquaryCellArtOpaque({ kind: 'crest', crestId: 'deed_future_bespoke' })).toBe(true);
  });

  it('checks the opaque original-art premise for every title that resolves to Whetstorm art', async () => {
    let checked = 0;
    for (const id of RELIQUARY_HORIZON_TITLES) {
      const art = reliquaryCellArt({ kind: 'title', id });
      if (art?.kind !== 'crest') continue;
      const url = deedImageUrl(art.crestId);
      if (!url?.startsWith('/ui/whetstorm/deeds/')) continue;
      expect(reliquaryCellArtOpaque(art), id).toBe(true);
      expect((await sharp(`public${url}`).metadata()).hasAlpha, id).toBe(false);
      checked++;
    }
    expect(checked).toBeGreaterThan(1);
  });
});
