import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { NECROMANCY_MOBS } from '../src/sim/content/necromancy';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const ids = ['graveguard', 'necromancy_skeletal_warrior', 'necromancy_bone_mage'];

describe('original necromancy summon portraits', () => {
  it('pins distinct generated masters and 128px deliveries for live templates', async () => {
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/necromancy-summons-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(new Set(entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(ids.length);
    for (const entry of entries) {
      expect(NECROMANCY_MOBS[entry.id]).toBeDefined();
      expect(entry.prompt.length).toBeGreaterThan(50);
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(hash(entry.path)).toBe(entry.sha256);
      expect(hash(entry.master.path)).toBe(entry.master.sha256);
      const master = await sharp(entry.master.path).metadata();
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBe(master.width);
      expect(await sharp(entry.path).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
    }
  });
});
