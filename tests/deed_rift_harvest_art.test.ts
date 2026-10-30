import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { riftHarvestDeedImageUrl } from '../src/ui/rift_harvest_deed_art';

const ids = ['dgn_rift', 'dgn_rift_s_rank', 'prog_legendmaker', 'col_golden_harvest'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('rift and harvest deed paintings', () => {
  it('maps live deeds to distinct pinned original artwork', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-rift-harvest-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id]).toBeDefined();
      expect(riftHarvestDeedImageUrl(record.id)).toBe(
        `/${record.shipping.replace(/^public\//, '')}`,
      );
      const crest = deedCrestId(record.id, DEEDS[record.id].category);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(`/${record.shipping.replace(/^public\//, '')}`);
      expect(iconDataUrl('crest', crest)).toBe(`/${record.shipping.replace(/^public\//, '')}`);
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
    expect(riftHarvestDeedImageUrl('unknown')).toBeNull();
  });
});
