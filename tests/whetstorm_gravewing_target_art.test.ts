import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { NECROMANCY_MOBS } from '../src/sim/content/necromancy';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/necromancy-gravewing-provenance.json', 'utf8'),
) as {
  entries: { id: string; path: string; sha256: string; master: { path: string; sha256: string } }[];
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Gravewing target portrait', () => {
  it('preserves the live mob art and full master', async () => {
    expect(provenance.entries).toHaveLength(1);
    const entry = provenance.entries[0];
    expect(entry.id).toBe('necromancy_gravewing');
    expect(NECROMANCY_MOBS[entry.id]?.id).toBe(entry.id);
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
    expect(master.height).toBeGreaterThanOrEqual(512);
  });
});
