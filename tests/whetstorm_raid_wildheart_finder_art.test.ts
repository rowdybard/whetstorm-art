import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { FINDER_ACTIVITIES } from '../src/sim/content/dungeon_finder';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/encounters/finder-raid-wildheart-provenance.json', 'utf8'),
) as {
  entries: { id: string; path: string; sha256: string; master: { path: string; sha256: string } }[];
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original raid and Wildheart finder portraits', () => {
  it('covers the four encounters with distinct, intact masters and 128px WebPs', async () => {
    expect(provenance.entries.map((entry) => entry.id)).toEqual([
      'nythraxis_scourge_of_thornpeak',
      'varkhul_forgefather_of_the_last_flame',
      'wildheart_beastmaster',
      'wildheart_high_priest',
    ]);
    for (const entry of provenance.entries) {
      expect(
        FINDER_ACTIVITIES.some((activity) =>
          activity.encounters.some((encounter) => encounter.mobId === entry.id),
        ),
      ).toBe(true);
      expect(entry.path).toBe(`public/ui/whetstorm/encounters/finder-${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/encounters/finder-${entry.id}.png`);
      expect(digest(entry.path)).toBe(entry.sha256);
      expect(digest(entry.master.path)).toBe(entry.master.sha256);
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
        hasAlpha: false,
      });
      const master = await sharp(entry.master.path).metadata();
      expect(master.format).toBe('png');
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBeGreaterThanOrEqual(512);
    }
    expect(new Set(provenance.entries.map((entry) => entry.sha256)).size).toBe(4);
    expect(new Set(provenance.entries.map((entry) => entry.master.sha256)).size).toBe(4);
  });
});
