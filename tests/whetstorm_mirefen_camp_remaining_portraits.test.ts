import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ZONE2_CAMPS, ZONE2_MOBS } from '../src/sim/content/zone2';

const entries = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/mirefen-camp-remaining-provenance.json', 'utf8'),
).entries;
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

it('pins distinct original portraits for the remaining Mirefen camp targets', async () => {
  const targets = [
    ['sloomtooth_the_drowned', 'mudfin'],
    ['spider_egg', 'spider'],
  ] as const;
  expect(entries).toHaveLength(targets.length);
  const hashes = new Set<string>();
  for (const [id, family] of targets) {
    expect(ZONE2_MOBS[id].family).toBe(family);
    expect(ZONE2_CAMPS.some((camp) => camp.mobId === id && camp.count > 0)).toBe(true);
    const entry = entries.find((candidate: { id: string }) => candidate.id === id);
    expect(entry.path).toBe(`public/ui/whetstorm/mobs/${id}.webp`);
    expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${id}.png`);
    expect(entry.source).toBe('OpenAI built-in image generation, text only');
    const asset = readFileSync(entry.path);
    const master = readFileSync(entry.master.path);
    expect([digest(asset), asset.length]).toEqual([entry.sha256, entry.bytes]);
    expect([digest(master), master.length]).toEqual([entry.master.sha256, entry.master.bytes]);
    expect(await sharp(asset).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
    });
    const metadata = await sharp(master).metadata();
    expect(metadata.format).toBe('png');
    expect(metadata.width).toBeGreaterThanOrEqual(512);
    expect(metadata.height).toBeGreaterThanOrEqual(512);
    hashes.add(digest(asset));
  }
  expect(hashes.size).toBe(targets.length);
});
