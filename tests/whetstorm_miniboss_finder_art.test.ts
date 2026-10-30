import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { FINDER_ACTIVITIES } from '../src/sim/content/dungeon_finder';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/encounters/finder-miniboss-provenance.json', 'utf8'),
) as {
  entries: { id: string; path: string; sha256: string; master: { path: string; sha256: string } }[];
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original dungeon finder miniboss portraits', () => {
  it('covers the three encounters with distinct intact masters and 128px WebPs', async () => {
    expect(provenance.entries.map((entry) => entry.id)).toEqual([
      'sexton_marrow',
      'knight_commander_olen',
      'choirmother_selthe',
    ]);
    for (const entry of provenance.entries) {
      expect(
        FINDER_ACTIVITIES.some((activity) =>
          activity.encounters.some((encounter) => encounter.mobId === entry.id && !encounter.final),
        ),
      ).toBe(true);
      expect(entry.path).toBe(`public/ui/whetstorm/encounters/finder-${entry.id}.webp`);
      expect(digest(entry.path)).toBe(entry.sha256);
      expect(digest(entry.master.path)).toBe(entry.master.sha256);
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
        hasAlpha: false,
      });
      expect(await sharp(entry.master.path).metadata()).toMatchObject({ format: 'png' });
    }
    expect(new Set(provenance.entries.map((entry) => entry.sha256)).size).toBe(3);
    expect(new Set(provenance.entries.map((entry) => entry.master.sha256)).size).toBe(3);
  });
});
