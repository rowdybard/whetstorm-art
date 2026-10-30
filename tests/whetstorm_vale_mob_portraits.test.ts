import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ZONE1_CAMPS, ZONE1_MOBS } from '../src/sim/content/zone1';

const ids = ['forest_wolf', 'wild_boar', 'webwood_spider', 'mudfin_murloc'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original early Vale mob portraits', () => {
  it('covers four spawned non-rare creatures with distinct original masters and 128px deliveries', async () => {
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/vale-early-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(new Set(entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(ids.length);
    expect(
      new Set(entries.map((entry: { master: { sha256: string } }) => entry.master.sha256)).size,
    ).toBe(ids.length);
    for (const entry of entries) {
      expect(ZONE1_MOBS[entry.id]).toBeDefined();
      expect(ZONE1_MOBS[entry.id].rare).not.toBe(true);
      expect(ZONE1_CAMPS.some((camp) => camp.mobId === entry.id && camp.count > 0)).toBe(true);
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
      expect(entry.prompt.length).toBeGreaterThan(50);
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(hash(entry.path)).toBe(entry.sha256);
      expect(hash(entry.master.path)).toBe(entry.master.sha256);
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      expect((await sharp(entry.master.path).metadata()).format).toBe('png');
    }
  });
});
