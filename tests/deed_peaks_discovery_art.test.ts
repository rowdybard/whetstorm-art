import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { peaksDiscoveryDeedImageUrl } from '../src/ui/peaks_discovery_deed_art';

const ids = [
  'chr_peaks_glimmer_cast',
  'chr_peaks_moongate',
  'chr_peaks_waking_witness',
  'exp_clue_ten_caskets',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('peaks and discovery deed paintings', () => {
  it('maps live deeds to distinct pinned artwork', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-peaks-discovery-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id].category).toBe(
        record.id === 'exp_clue_ten_caskets' ? 'exploration' : 'chronicle',
      );
      expect(peaksDiscoveryDeedImageUrl(record.id)).toBe(
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
    expect(peaksDiscoveryDeedImageUrl('unknown')).toBeNull();
  });
});
