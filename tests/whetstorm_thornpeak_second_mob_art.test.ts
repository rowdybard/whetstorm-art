import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ZONE3_CAMPS, ZONE3_MOBS } from '../src/sim/content/zone3';

const ids = ['ogre_crusher', 'wyrmcult_zealot', 'wyrmcult_necromancer', 'boneclad_revenant'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/thornpeak-overworld-second-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('additional Thornpeak overworld target portraits', () => {
  it('covers active overworld camp mobs', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    for (const id of ids) {
      expect(ZONE3_MOBS[id]).toBeDefined();
      expect(ZONE3_CAMPS.some((camp) => camp.mobId === id)).toBe(true);
    }
  });

  it('pins distinct shipping images and their original masters', async () => {
    const hashes = new Set<string>();
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
      const metadata = await sharp(master).metadata();
      expect(metadata.format).toBe('png');
      expect(metadata.width).toBeGreaterThanOrEqual(512);
      expect(metadata.height).toBeGreaterThanOrEqual(512);
      hashes.add(entry.sha256);
    }
    expect(hashes.size).toBe(ids.length);
  });
});
