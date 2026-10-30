import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { REALM_CAMPS, REALM_MOBS } from '../src/sim/content/realm';

const entries = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/realm-camps-provenance.json', 'utf8'),
).entries;
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

it('pins distinct original portraits for the remaining Veiled Hollow camp targets', async () => {
  const targets = [
    ['glimmerwisp', 'elemental'],
    ['duskwisp', 'elemental'],
    ['aurelhorn', 'beast'],
  ] as const;
  expect(entries).toHaveLength(targets.length);
  const assets = new Set<string>();
  const masters = new Set<string>();
  for (const [id, family] of targets) {
    expect(REALM_MOBS[id].family).toBe(family);
    expect(REALM_CAMPS.some((camp) => camp.mobId === id && camp.count > 0)).toBe(true);
    const entry = entries.find((candidate: { id: string }) => candidate.id === id);
    expect(entry.path).toBe(`public/ui/whetstorm/mobs/${id}.webp`);
    expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${id}.png`);
    expect(entry.source).toBe('OpenAI built-in image generation, text only');
    expect(entry.prompt.length).toBeGreaterThan(50);
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
    assets.add(digest(asset));
    masters.add(digest(master));
  }
  expect(assets.size).toBe(targets.length);
  expect(masters.size).toBe(targets.length);
});
