import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { ascendantDeedImageUrl } from '../src/ui/ascendant_deed_art';

const ids = ['prog_mythic', 'prog_eternal', 'prog_full_build'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('advanced progression deed paintings', () => {
  it('maps live deeds to distinct pinned artwork', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-ascendant-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id].category).toBe('progression');
      expect(ascendantDeedImageUrl(record.id)).toBe(`/${record.shipping.replace(/^public\//, '')}`);
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
    expect(ascendantDeedImageUrl('unknown')).toBeNull();
  });
});
