import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, hasCrestRecipe, iconDataUrl } from '../src/ui/icons';
import { marshPeaksFishingDeedImageUrl } from '../src/ui/marsh_peaks_fishing_deed_art';
import { reliquaryCellArtOpaque } from '../src/ui/reliquary_cell_art';

const ids = [
  'chr_marsh_hush_the_mending',
  'chr_marsh_rares',
  'chr_peaks_sparring',
  'col_glimmerfin',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('marsh, peaks and fishing deed paintings', () => {
  it('routes live deeds to distinct recorded original art', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-marsh-peaks-fishing-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      const id = record.id as string;
      expect(DEEDS[id].category).toBe(id.startsWith('chr_') ? 'chronicle' : 'collection');
      const url = `/ui/whetstorm/deeds/${id}.webp`;
      expect(record.shipping).toBe(`public${url}`);
      expect(record.source).toBe('OpenAI built-in image generation');
      expect(record.referenceImages).toEqual([]);
      expect(record.prompt.length).toBeGreaterThan(50);
      expect(hash(record.master)).toBe(record.masterSha256);
      expect(hash(record.shipping)).toBe(record.shippingSha256);
      expect(await sharp(record.shipping).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
        hasAlpha: false,
      });
      expect(marshPeaksFishingDeedImageUrl(id)).toBe(url);
      expect(earlyDeedImageUrl(id)).toBe(url);
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(crest).toBe(`deed_${id}`);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
      expect(reliquaryCellArtOpaque({ kind: 'crest', crestId: crest })).toBe(true);
    }
    expect(marshPeaksFishingDeedImageUrl('unknown')).toBeNull();
  });

  it('preserves procedural category fallback for deeds without paintings', () => {
    for (const category of ['chronicle', 'collection']) {
      const crest = deedCrestId('unknown_deed', category);
      expect(crest).toBe(`deed_cat_${category}`);
      expect(hasCrestRecipe(crest)).toBe(true);
      expect(deedCrestHasPaintedArt(crest)).toBe(false);
    }
  });
});
