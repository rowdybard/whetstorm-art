import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DROWNED_LITANY_MODULES } from '../src/sim/content/delves/drowned_litany';
import { DELVE_MOBS } from '../src/sim/content/delves/mobs';
import { targetPortraitUrl } from '../src/ui/target_portrait_view';

const ids = ['deepfen_spearjaw', 'mirefen_widowling', 'drowned_cantor', 'grave_silt_bulwark'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/drowned-litany-first-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

it('pins independent original portraits for active Drowned Litany enemies', async () => {
  const spawns = Object.values(DROWNED_LITANY_MODULES).flatMap((module) =>
    module.spawnSets.flatMap((set) => set.spawns.map((spawn) => spawn.mobId)),
  );
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  for (const entry of provenance.entries) {
    expect(spawns).toContain(entry.id);
    expect(DELVE_MOBS[entry.id]).toBeDefined();
    expect(entry.source).toBe('OpenAI built-in image generation, text only');
    expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
    expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
    expect(targetPortraitUrl(entry.id, true)).toBe(`/ui/whetstorm/mobs/${entry.id}.webp`);
    const asset = readFileSync(entry.path);
    const master = readFileSync(entry.master.path);
    expect(digest(asset)).toBe(entry.sha256);
    expect(asset.length).toBe(entry.bytes);
    expect(digest(master)).toBe(entry.master.sha256);
    expect(master.length).toBe(entry.master.bytes);
    expect(await sharp(asset).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
    });
    const metadata = await sharp(master).metadata();
    expect(metadata.format).toBe('png');
    expect(metadata.width).toBeGreaterThanOrEqual(512);
    expect(metadata.height).toBeGreaterThanOrEqual(512);
  }
  expect(new Set(provenance.entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(
    ids.length,
  );
});
