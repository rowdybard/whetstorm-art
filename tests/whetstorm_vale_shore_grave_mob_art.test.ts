import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  PROVING_SHORE_CAMPS,
  PROVING_SHORE_MOBS,
  PROVING_SHORE_QUESTS,
} from '../src/sim/content/proving_shore';
import { ZONE1_CAMPS, ZONE1_CHAPEL_CAMPS, ZONE1_MOBS } from '../src/sim/content/zone1';

const ids = ['shore_scuttler', 'mister_crabs', 'captain_verlan', 'wraithbinder_maldrec'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original shore and Vale grave portraits', () => {
  it('covers live targets with distinct masters and 128px deliveries', async () => {
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/vale-shore-grave-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    for (const key of ['sha256', 'prompt'])
      expect(new Set(entries.map((entry: Record<string, string>) => entry[key])).size).toBe(
        ids.length,
      );
    expect(
      new Set(entries.map((entry: { master: { sha256: string } }) => entry.master.sha256)).size,
    ).toBe(ids.length);
    expect(
      PROVING_SHORE_CAMPS.some((camp) => camp.mobId === 'shore_scuttler' && camp.count > 0),
    ).toBe(true);
    for (const id of ids.slice(0, 2)) {
      expect(PROVING_SHORE_MOBS[id]).toBeDefined();
      expect(
        Object.values(PROVING_SHORE_QUESTS).some((quest) =>
          quest.objectives.some(
            (objective) => objective.type === 'kill' && objective.targetMobId === id,
          ),
        ),
      ).toBe(true);
    }
    for (const id of ids.slice(2)) {
      expect(ZONE1_MOBS[id]).toBeDefined();
      expect(
        [...ZONE1_CAMPS, ...ZONE1_CHAPEL_CAMPS].some((camp) => camp.mobId === id && camp.count > 0),
      ).toBe(true);
    }
    for (const entry of entries) {
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
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
