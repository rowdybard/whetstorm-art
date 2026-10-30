import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { HOARD_MOBS } from '../src/sim/content/rift/mobs';
import { HOARD_PULSAR_TEMPLATE } from '../src/sim/rift/hoard_pulsars_core';
import { HOARD_TENTACLE_TEMPLATE } from '../src/sim/rift/hoard_tentacles_core';

const ids = [
  'hoard_brood_hatchling',
  'hoard_healing_tide_totem',
  'hoard_bound_pulsar',
  'hoard_abyssal_tentacle',
];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/hoard-actors-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Buried Hoard encounter actor portraits', () => {
  it('covers the spawned actor templates', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(HOARD_PULSAR_TEMPLATE).toBe(ids[2]);
    expect(HOARD_TENTACLE_TEMPLATE).toBe(ids[3]);
    for (const id of ids) expect(HOARD_MOBS[id]?.id).toBe(id);
  });

  it('pins distinct shipping images and original masters', async () => {
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
