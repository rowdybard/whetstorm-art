import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DUNGEON_DEFS, DUNGEON_MOBS } from '../src/sim/content/dungeons';

const ids = ['crypt_shambler', 'hollow_acolyte', 'bonechill_widow', 'bastion_revenant'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/early-dungeons-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('early dungeon target portraits', () => {
  it('covers live non-boss dungeon spawns', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    for (const id of ids) {
      expect(DUNGEON_MOBS[id]).toBeDefined();
      expect(DUNGEON_MOBS[id].boss).not.toBe(true);
      const dungeon = id === 'bastion_revenant' ? 'sunken_bastion' : 'hollow_crypt';
      expect(DUNGEON_DEFS[dungeon].spawns.some((spawn) => spawn.mobId === id)).toBe(true);
    }
  });

  it('pins distinct original masters and 128px shipping images', async () => {
    const hashes = new Set<string>();
    const masterHashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
      expect(entry.prompt.length).toBeGreaterThan(100);
      const webp = readFileSync(entry.path);
      const master = readFileSync(entry.master.path);
      expect(digest(webp)).toBe(entry.sha256);
      expect(webp.length).toBe(entry.bytes);
      expect(digest(master)).toBe(entry.master.sha256);
      expect(master.length).toBe(entry.master.bytes);
      expect(await sharp(webp).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      const source = await sharp(master).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      hashes.add(entry.sha256);
      masterHashes.add(entry.master.sha256);
    }
    expect(hashes.size).toBe(ids.length);
    expect(masterHashes.size).toBe(ids.length);
  });
});
