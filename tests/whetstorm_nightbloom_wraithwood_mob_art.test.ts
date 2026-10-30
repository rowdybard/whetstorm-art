import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { NIGHTBLOOM_CAMPS, NIGHTBLOOM_MOBS } from '../src/sim/content/nightbloom';
import { WRAITHWOOD_CAMPS, WRAITHWOOD_MOBS } from '../src/sim/content/wraithwood';
import { targetPortraitUrl } from '../src/ui/target_portrait_view';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/nightbloom-wraithwood-provenance.json', 'utf8'),
) as {
  entries: { id: string; path: string; sha256: string; master: { path: string; sha256: string } }[];
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Nightbloom and Wraithwood target portraits', () => {
  it('covers active enemies with distinct original masters and 128px deliveries', async () => {
    expect(provenance.entries.map(({ id }) => id)).toEqual([
      'moonfleece_grazer',
      'gloam_strider',
      'nightkin_stargazer',
      'wood_wraith',
    ]);
    for (const entry of provenance.entries) {
      expect(NIGHTBLOOM_MOBS[entry.id] ?? WRAITHWOOD_MOBS[entry.id]).toBeDefined();
      expect(
        [...NIGHTBLOOM_CAMPS, ...WRAITHWOOD_CAMPS].some((camp) => camp.mobId === entry.id),
      ).toBe(true);
      expect(targetPortraitUrl(entry.id, true)).toBe(`/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
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
      expect(master.height).toBe(master.width);
    }
    expect(new Set(provenance.entries.map(({ sha256 }) => sha256)).size).toBe(4);
    expect(new Set(provenance.entries.map(({ master }) => master.sha256)).size).toBe(4);
  });
});
