import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ZONE3_CAMPS, ZONE3_MOBS } from '../src/sim/content/zone3';

const entries = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/thornpeak-named-three-provenance.json', 'utf8'),
).entries;
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

it('pins distinct original portraits for the live Thornpeak named enemies', async () => {
  const targets = [
    ['shardlord_kazzix', 'elemental'],
    ['threnos_first_voice', 'humanoid'],
    ['marrowlord_varkas', 'undead'],
  ] as const;
  expect(entries).toHaveLength(targets.length);
  const hashes = new Set<string>();
  for (const [id, family] of targets) {
    expect(ZONE3_MOBS[id].family).toBe(family);
    expect(ZONE3_CAMPS.some((camp) => camp.mobId === id && camp.count === 1)).toBe(true);
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
