import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ZONE1_CAMPS, ZONE1_MOBS } from '../src/sim/content/zone1';
import { CAMPS } from '../src/sim/data';

const ids = ['mogger', 'mogger_lackey', 'grix_the_tunnelking', 'gorrak'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Vale rare portraits', () => {
  it('pins independent art for active overworld mobs and the summoned lackey', async () => {
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/vale-rares-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(new Set(entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(ids.length);
    expect(
      new Set(entries.map((entry: { master: { sha256: string } }) => entry.master.sha256)).size,
    ).toBe(ids.length);
    expect(new Set(entries.map((entry: { prompt: string }) => entry.prompt)).size).toBe(ids.length);
    for (const id of ['mogger', 'gorrak'])
      expect(ZONE1_CAMPS.some((camp) => camp.mobId === id && camp.count > 0)).toBe(true);
    expect(CAMPS.some((camp) => camp.mobId === 'grix_the_tunnelking' && camp.count > 0)).toBe(true);
    expect(ZONE1_MOBS.mogger.summonAdds?.mobId).toBe('mogger_lackey');
    for (const entry of entries) {
      expect(ZONE1_MOBS[entry.id]).toBeDefined();
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
      expect(entry.prompt.length).toBeGreaterThan(50);
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
      for (const asset of [entry, entry.master]) {
        expect(hash(asset.path)).toBe(asset.sha256);
        expect(statSync(asset.path).size).toBe(asset.bytes);
      }
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      const master = await sharp(entry.master.path).metadata();
      expect(master.format).toBe('png');
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBe(master.width);
    }
  });
});
