import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { PALMREACH_CAMPS, PALMREACH_MOBS } from '../src/sim/content/palmreach';

const ids = ['canopy_weaver', 'idol_guardian', 'derelict_mech', 'wildheart_high_priest'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Palmreach, forge and Wildheart target portraits', () => {
  it('ships distinct 128px portraits with traceable PNG masters', async () => {
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/palmreach-forge-wildheart-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(new Set(entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(ids.length);
    expect(
      new Set(entries.map((entry: { master: { sha256: string } }) => entry.master.sha256)).size,
    ).toBe(ids.length);
    for (const id of ids.slice(0, 2)) {
      expect(PALMREACH_MOBS[id]).toBeDefined();
      expect(PALMREACH_CAMPS.some((camp) => camp.mobId === id && camp.count > 0)).toBe(true);
    }
    for (const entry of entries) {
      expect(entry.prompt.length).toBeGreaterThan(50);
      const finder = entry.id === 'wildheart_high_priest';
      expect(entry.path).toBe(
        finder
          ? 'public/ui/whetstorm/encounters/finder-wildheart_high_priest.webp'
          : `public/ui/whetstorm/mobs/${entry.id}.webp`,
      );
      expect(entry.master.path).toBe(
        finder
          ? 'docs/design/whetstorm-art/encounters/finder-wildheart_high_priest.png'
          : `docs/design/whetstorm-art/mobs/${entry.id}.png`,
      );
      if (finder) {
        const original = JSON.parse(
          readFileSync(
            'public/ui/whetstorm/encounters/finder-raid-wildheart-provenance.json',
            'utf8',
          ),
        ).entries.find((item: { id: string }) => item.id === entry.id);
        expect(entry.sha256).toBe(original.sha256);
        expect(entry.master.sha256).toBe(original.master.sha256);
        expect(entry.prompt).toBe(original.prompt);
      }
      expect(hash(entry.path)).toBe(entry.sha256);
      expect(hash(entry.master.path)).toBe(entry.master.sha256);
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      expect((await sharp(entry.master.path).metadata()).format).toBe('png');
    }
  });
});
