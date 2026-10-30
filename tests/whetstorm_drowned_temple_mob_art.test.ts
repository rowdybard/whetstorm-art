import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { TEMPLE_DUNGEON_DEFS, TEMPLE_DUNGEON_MOBS } from '../src/sim/content/temple';

const ids = [
  'drowned_templeguard',
  'pale_choir_acolyte',
  'glimmerscale_lurker',
  'pearlguard_sentinel',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Drowned Temple target portraits', () => {
  it('has distinct original masters and 128px deliveries for the four spawned non-bosses', async () => {
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/drowned-temple-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(new Set(entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(ids.length);
    expect(
      new Set(entries.map((entry: { master: { sha256: string } }) => entry.master.sha256)).size,
    ).toBe(ids.length);
    for (const entry of entries) {
      expect(TEMPLE_DUNGEON_MOBS[entry.id]).toBeDefined();
      expect(TEMPLE_DUNGEON_MOBS[entry.id].boss).not.toBe(true);
      expect(
        TEMPLE_DUNGEON_DEFS.drowned_temple.spawns.some((spawn) => spawn.mobId === entry.id),
      ).toBe(true);
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
