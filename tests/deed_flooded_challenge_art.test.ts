import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { floodedChallengeDeedImageUrl } from '../src/ui/flooded_challenge_deed_art';

const ids = ['dgn_vael_thralls', 'dgn_ysolei_moonspawn', 'dgn_ysolei_flawless'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('flooded encounter deed paintings', () => {
  it('maps live deeds to distinct pinned artwork', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-flooded-challenges-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id].category).toBe('dungeon');
      expect(floodedChallengeDeedImageUrl(record.id)).toBe(
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
    expect(floodedChallengeDeedImageUrl('unknown')).toBeNull();
  });
});
