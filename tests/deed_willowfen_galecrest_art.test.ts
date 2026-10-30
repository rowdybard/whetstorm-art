import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { willowfenGalecrestDeedImageUrl } from '../src/ui/willowfen_galecrest_deed_art';

const ids = [
  'chr_willowfen_first_cast',
  'chr_willowfen_gatherer',
  'chr_galecrest_first_cast',
  'chr_galecrest_gatherer',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Willowfen and Galecrest deed paintings', () => {
  it('resolves live deeds to distinct pinned original artwork', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-willowfen-galecrest-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id].category).toBe('chronicle');
      expect(willowfenGalecrestDeedImageUrl(record.id)).toBe(
        `/${record.shipping.replace(/^public\//, '')}`,
      );
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
    expect(willowfenGalecrestDeedImageUrl('chr_willowfen_first_cast_extra')).toBeNull();
    expect(willowfenGalecrestDeedImageUrl('unknown')).toBeNull();
  });
});
