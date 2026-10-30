import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { COLLAPSED_RELIQUARY_MODULES, DELVE_MOBS } from '../src/sim/content/delves';

const ids = [
  'reliquary_ledger_wraith',
  'reliquary_funeral_ringer',
  'reliquary_gravecall_acolyte',
  'reliquary_saintless_effigy',
];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/collapsed-reliquary-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('collapsed reliquary target portraits', () => {
  it('covers active delve spawn templates', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    const spawns = Object.values(COLLAPSED_RELIQUARY_MODULES).flatMap((module) =>
      module.spawnSets.flatMap((set) => set.spawns.map((spawn) => spawn.mobId)),
    );
    for (const id of ids) {
      expect(DELVE_MOBS[id]).toBeDefined();
      expect(spawns).toContain(id);
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
