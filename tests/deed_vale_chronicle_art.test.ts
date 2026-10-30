import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { valeChronicleDeedImageUrl } from '../src/ui/vale_chronicle_deed_art';

const ids = [
  'chr_vale_chapter_i',
  'chr_vale_chapter_ii',
  'chr_vale_chapter_iii',
  'chr_vale_packbreaker',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Vale chronicle deed paintings', () => {
  it('routes live deeds through the game and guide lookup to distinct recorded art', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-vale-chronicle-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id]).toMatchObject({ category: 'chronicle' });
      const url = `/ui/whetstorm/deeds/${record.id}.webp`;
      const crest = deedCrestId(record.id, DEEDS[record.id].category);
      expect(record.shipping).toBe(`public${url}`);
      expect(valeChronicleDeedImageUrl(record.id)).toBe(url);
      expect(earlyDeedImageUrl(record.id)).toBe(url);
      expect(crest).toBe(`deed_${record.id}`);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
      expect(record.source).toBe('OpenAI built-in image generation');
      expect(record.referenceImages).toEqual([]);
      expect(record.prompt.length).toBeGreaterThan(50);
      expect(hash(record.master)).toBe(record.masterSha256);
      expect(hash(record.shipping)).toBe(record.shippingSha256);
      expect(await sharp(record.shipping).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
    }
    expect(valeChronicleDeedImageUrl('unknown')).toBeNull();
  });
});
