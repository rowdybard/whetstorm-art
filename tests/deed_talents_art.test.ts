import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const ids = ['prog_double_digits', 'prog_talented', 'prog_specialized'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
describe('talent progression deed paintings', () => {
  it('routes live deed crests to their paintings', () => {
    for (const id of ids) {
      expect(DEEDS[id]).toMatchObject({ category: 'progression' });
      const url = `/ui/whetstorm/deeds/${id}.webp`;
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(earlyDeedImageUrl(id)).toBe(url);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
    }
  });
  it('pins distinct masters and delivery images', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-talents-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { masterSha256: string }) => record.masterSha256)).size,
    ).toBe(3);
    for (const record of records) {
      expect(record.referenceImages).toEqual([]);
      expect(record.prompt.length).toBeGreaterThan(50);
      expect(hash(record.master)).toBe(record.masterSha256);
      expect(hash(record.shipping)).toBe(record.shippingSha256);
      expect(await sharp(record.shipping).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
    }
  });
});
