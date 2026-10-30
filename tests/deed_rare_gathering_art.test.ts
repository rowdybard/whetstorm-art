import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { rareGatheringDeedImageUrl } from '../src/ui/rare_gathering_deed_art';

const ids = [
  'col_pristine_vein',
  'col_ancient_heartwood',
  'col_moonlit_bloom',
  'col_perfect_specimen',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('rare gathering deed paintings', () => {
  it('maps live deeds to distinct pinned artwork', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-rare-gathering-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id].category).toBe('collection');
      expect(rareGatheringDeedImageUrl(record.id)).toBe(
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
    expect(rareGatheringDeedImageUrl('unknown')).toBeNull();
  });
});
