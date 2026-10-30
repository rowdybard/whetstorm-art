import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  EVERGARDEN_CAMPS,
  EVERGARDEN_KNIGHT_CAMPS,
  EVERGARDEN_MOBS,
} from '../src/sim/content/evergarden';

const ids = ['topiary_stag', 'topiary_wolf', 'hedge_gnome', 'hedge_knight'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/evergarden-overworld-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Evergarden overworld target portraits', () => {
  it('covers active overworld camp mobs', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    for (const id of ids) {
      expect(EVERGARDEN_MOBS[id]).toBeDefined();
      expect(
        [...EVERGARDEN_CAMPS, ...EVERGARDEN_KNIGHT_CAMPS].some((camp) => camp.mobId === id),
      ).toBe(true);
    }
  });

  it('pins distinct shipping images and their original masters', async () => {
    const hashes = new Set<string>();
    const masters = new Set<string>();
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
      masters.add(entry.master.sha256);
    }
    expect(hashes.size).toBe(ids.length);
    expect(masters.size).toBe(ids.length);
  });
});
