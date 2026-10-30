import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { MIREFEN_MOOR_BOSS_CAMPS, ZONE2_CAMPS, ZONE2_MOBS } from '../src/sim/content/zone2';

const ids = ['old_peatfire', 'mirejaw_the_ravenous', 'sister_nhalia', 'deacon_voss'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Mirefen named target portraits', () => {
  it('pins distinct original art for active zone 2 targets', async () => {
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/mirefen-named-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    for (const key of ['sha256', 'prompt']) {
      expect(new Set(entries.map((entry: Record<string, string>) => entry[key])).size).toBe(
        ids.length,
      );
    }
    expect(
      new Set(entries.map((entry: { master: { sha256: string } }) => entry.master.sha256)).size,
    ).toBe(ids.length);
    for (const entry of entries) {
      expect(ZONE2_MOBS[entry.id]).toBeDefined();
      expect(
        [...ZONE2_CAMPS, ...MIREFEN_MOOR_BOSS_CAMPS].some(
          (camp) => camp.mobId === entry.id && camp.count > 0,
        ),
      ).toBe(true);
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
