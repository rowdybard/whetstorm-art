import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, hasCrestRecipe, iconDataUrl } from '../src/ui/icons';
import { peatfireDeedImageUrl } from '../src/ui/peatfire_deed_art';
import { reliquaryCellArtOpaque } from '../src/ui/reliquary_cell_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Old Peatfire deed painting', () => {
  it('routes the live deed through game and guide lookup to its recorded original', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-peatfire-generation.json', 'utf8'),
    );
    expect(records).toHaveLength(1);
    const record = records[0];
    const id = 'chr_old_peatfire';
    const url = `/ui/whetstorm/deeds/${id}.webp`;
    expect(record.id).toBe(id);
    expect(DEEDS[id]).toMatchObject({
      category: 'chronicle',
      trigger: { kind: 'visit', markId: 'slain:old_peatfire' },
    });
    expect(record.source).toBe('OpenAI built-in image generation');
    expect(record.referenceImages).toEqual([]);
    expect(record.prompt.length).toBeGreaterThan(50);
    expect(record.shipping).toBe(`public${url}`);
    expect(hash(record.master)).toBe(record.masterSha256);
    expect(hash(record.shipping)).toBe(record.shippingSha256);
    expect(await sharp(record.shipping).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    expect(peatfireDeedImageUrl(id)).toBe(url);
    expect(earlyDeedImageUrl(id)).toBe(url);
    const crest = deedCrestId(id, DEEDS[id].category);
    expect(crest).toBe(`deed_${id}`);
    expect(deedCrestHasPaintedArt(crest)).toBe(true);
    expect(deedImageUrl(crest)).toBe(url);
    expect(iconDataUrl('crest', crest)).toBe(url);
    expect(reliquaryCellArtOpaque({ kind: 'crest', crestId: crest })).toBe(true);
    expect(peatfireDeedImageUrl('unknown')).toBeNull();
  });

  it('retains the procedural category fallback for an unknown chronicle deed', () => {
    const crest = deedCrestId('unknown_chronicle_deed', 'chronicle');
    expect(crest).toBe('deed_cat_chronicle');
    expect(hasCrestRecipe(crest)).toBe(true);
    expect(deedCrestHasPaintedArt(crest)).toBe(false);
  });
});
