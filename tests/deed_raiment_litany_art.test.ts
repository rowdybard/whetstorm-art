import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, hasCrestRecipe, iconDataUrl } from '../src/ui/icons';
import { raimentLitanyDeedImageUrl } from '../src/ui/raiment_litany_deed_art';
import { reliquaryCellArtOpaque } from '../src/ui/reliquary_cell_art';

const ids = [
  'col_set_soulflame',
  'col_set_stormcallers',
  'dlv_litany_heroic',
  'dlv_varric_ringers',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('raiment and Litany deed paintings', () => {
  it('routes live deeds to distinct recorded original art', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-raiment-litany-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      const id = record.id as string;
      expect(DEEDS[id].category).toBe(id.startsWith('dlv_') ? 'delve' : 'collection');
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
      expect(raimentLitanyDeedImageUrl(id)).toBe(url);
      expect(earlyDeedImageUrl(id)).toBe(url);
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(crest).toBe(`deed_${id}`);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
      expect(reliquaryCellArtOpaque({ kind: 'crest', crestId: crest })).toBe(true);
    }
    expect(raimentLitanyDeedImageUrl('unknown')).toBeNull();
  });

  it('preserves procedural category fallback for deeds without paintings', () => {
    for (const category of ['delve', 'collection']) {
      const crest = deedCrestId('unknown_deed', category);
      expect(crest).toBe(`deed_cat_${category}`);
      expect(hasCrestRecipe(crest)).toBe(true);
      expect(deedCrestHasPaintedArt(crest)).toBe(false);
    }
  });
});
