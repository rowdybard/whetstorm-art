import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl } from '../src/ui/icons';
import { nightbloomWraithwoodDeedImageUrl } from '../src/ui/nightbloom_wraithwood_deed_art';

const ids = [
  'chr_nightbloom_first_cast',
  'chr_nightbloom_gatherer',
  'chr_wraithwood_first_cast',
  'chr_wraithwood_gatherer',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Nightbloom and Wraithwood deed paintings', () => {
  it('resolves live deeds to distinct pinned original artwork', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-nightbloom-wraithwood-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id].category).toBe('chronicle');
      const url = `/${record.shipping.replace(/^public\//, '')}`;
      expect(nightbloomWraithwoodDeedImageUrl(record.id)).toBe(url);
      expect(earlyDeedImageUrl(record.id)).toBe(url);
      expect(deedImageUrl(`deed_${record.id}`)).toBe(url);
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
    expect(nightbloomWraithwoodDeedImageUrl('unknown')).toBeNull();
  });
});
