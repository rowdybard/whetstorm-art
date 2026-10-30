import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ZONE3_CAMPS, ZONE3_MOBS } from '../src/sim/content/zone3';
import { targetPortraitUrl } from '../src/ui/target_portrait_view';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/thornpeak-overworld-provenance.json', 'utf8'),
) as {
  entries: {
    id: string;
    prompt: string;
    path: string;
    sha256: string;
    master: { path: string; sha256: string };
  }[];
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Thornpeak overworld target portraits', () => {
  it('records the Ridge Stalker as a wolf, matching its in-world beast model', () => {
    expect(provenance.entries.find((entry) => entry.id === 'ridge_stalker')?.prompt).toContain(
      'wolf',
    );
  });

  it('covers four active enemies with distinct full masters and 128px deliveries', async () => {
    expect(provenance.entries.map((entry) => entry.id)).toEqual([
      'ridge_stalker',
      'deeprock_kobold',
      'thornpeak_ogre',
      'stormcrag_elemental',
    ]);
    for (const entry of provenance.entries) {
      expect(ZONE3_MOBS[entry.id]).toBeDefined();
      expect(ZONE3_CAMPS.some((camp) => camp.mobId === entry.id)).toBe(true);
      expect(targetPortraitUrl(entry.id, true)).toBe(`/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
      expect(digest(entry.path)).toBe(entry.sha256);
      expect(digest(entry.master.path)).toBe(entry.master.sha256);
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
        hasAlpha: false,
      });
      const master = await sharp(entry.master.path).metadata();
      expect(master.format).toBe('png');
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBe(master.width);
    }
    expect(new Set(provenance.entries.map((entry) => entry.sha256)).size).toBe(4);
    expect(new Set(provenance.entries.map((entry) => entry.master.sha256)).size).toBe(4);
  });
});
