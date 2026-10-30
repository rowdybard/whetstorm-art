import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DUNGEON_MOBS } from '../src/sim/content/dungeons';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/raid-sanctum-targets-provenance.json', 'utf8'),
) as {
  entries: { id: string; path: string; sha256: string; master: { path: string; sha256: string } }[];
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original raid and sanctum target portraits', () => {
  it('preserves distinct portraits and full masters for live dungeon mob templates', async () => {
    const families: Record<string, string> = {
      ignivar_heart_of_the_end: 'elemental',
      nythraxis_bone_spike: 'undead',
      sanctum_boneguard: 'undead',
      sanctum_drakonid: 'dragonkin',
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(Object.keys(families));
    for (const entry of provenance.entries) {
      expect(DUNGEON_MOBS[entry.id]?.family).toBe(families[entry.id]);
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
    }
    expect(new Set(provenance.entries.map((entry) => entry.sha256)).size).toBe(4);
    expect(new Set(provenance.entries.map((entry) => entry.master.sha256)).size).toBe(4);
  });
});
