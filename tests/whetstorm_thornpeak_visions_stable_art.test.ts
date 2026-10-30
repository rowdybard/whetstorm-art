import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ZONE3_CAMPS, ZONE3_MOBS } from '../src/sim/content/zone3';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/thornpeak-visions-stable-provenance.json', 'utf8'),
) as {
  entries: {
    id: string;
    path: string;
    sha256: string;
    prompt: string;
    master: { path: string; sha256: string };
  }[];
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Thornpeak stable and vision portrait art', () => {
  it('has independent original masters and 128px deliveries for live actors', async () => {
    expect(provenance.entries.map(({ id }) => id)).toEqual([
      'stable_horse',
      'vision_aldren_warrior',
      'vision_malric_mage',
      'vision_deathstalker_voss',
    ]);
    expect(ZONE3_CAMPS.some((camp) => camp.mobId === 'stable_horse')).toBe(true);
    for (const entry of provenance.entries) {
      expect(ZONE3_MOBS[entry.id]).toBeDefined();
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
      expect(digest(entry.path)).toBe(entry.sha256);
      expect(digest(entry.master.path)).toBe(entry.master.sha256);
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      const master = await sharp(entry.master.path).metadata();
      expect(master.format).toBe('png');
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBe(master.width);
    }
    for (const values of [
      provenance.entries.map((entry) => entry.sha256),
      provenance.entries.map((entry) => entry.master.sha256),
      provenance.entries.map((entry) => entry.prompt),
    ]) {
      expect(new Set(values).size).toBe(4);
    }
  });
});
