import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { NIGHTBLOOM_CAMPS, NIGHTBLOOM_MOBS } from '../src/sim/content/nightbloom';
import { REALM_CAMPS, REALM_MOBS } from '../src/sim/content/realm';
import { ZONE3_CAMPS, ZONE3_MOBS } from '../src/sim/content/zone3';

const ids = ['voskar_emberwing', 'barrow_king', 'gleamstag', 'old_marrowshell'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/named-overworld-rares-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('named overworld target portraits', () => {
  it('covers active named camps', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    for (const [id, mobs, camps] of [
      [ids[0], ZONE3_MOBS, ZONE3_CAMPS],
      [ids[1], NIGHTBLOOM_MOBS, NIGHTBLOOM_CAMPS],
      [ids[2], REALM_MOBS, REALM_CAMPS],
      [ids[3], REALM_MOBS, REALM_CAMPS],
    ] as const) {
      expect(mobs[id]).toBeDefined();
      expect(camps.some((camp) => camp.mobId === id)).toBe(true);
    }
  });
  it('pins distinct 128px images and their original masters', async () => {
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
        hasAlpha: false,
      });
      const metadata = await sharp(master).metadata();
      expect(metadata.format).toBe('png');
      expect(metadata.width).toBeGreaterThanOrEqual(512);
      expect(metadata.height).toBe(metadata.width);
      hashes.add(entry.sha256);
    }
    expect(hashes.size).toBe(ids.length);
  });
});
