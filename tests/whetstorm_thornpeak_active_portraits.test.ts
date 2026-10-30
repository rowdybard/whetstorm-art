import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ZONE3_CAMPS, ZONE3_MOBS } from '../src/sim/content/zone3';
import { WORLD_BOSSES } from '../src/sim/world_boss';

const ids = ['training_dummy', 'ironvein_sapper', 'thunzharr_waking_peak', 'thunzharr_stormling'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Thornpeak active target portraits', () => {
  it('covers the active camp target, world boss, and their summons with distinct art', async () => {
    expect(ZONE3_CAMPS.some((camp) => camp.mobId === ids[0] && camp.count > 0)).toBe(true);
    expect(ZONE3_MOBS.ironvein_foreman.summonAdds?.mobId).toBe(ids[1]);
    expect(WORLD_BOSSES.some((boss) => boss.templateId === ids[2])).toBe(true);
    expect(ZONE3_MOBS.thunzharr_waking_peak.summonAdds?.mobId).toBe(ids[3]);
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/thornpeak-active-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(new Set(entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(ids.length);
    expect(
      new Set(entries.map((entry: { master: { sha256: string } }) => entry.master.sha256)).size,
    ).toBe(ids.length);
    for (const entry of entries) {
      expect(ZONE3_MOBS[entry.id]).toBeDefined();
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
      expect(entry.prompt.length).toBeGreaterThan(50);
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
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
