import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  COLLAPSED_RELIQUARY_DELVE,
  DELVE_COMPANIONS,
  DELVE_MOBS,
  DROWNED_LITANY_DELVE,
} from '../src/sim/content/delves';
import { targetPortraitUrl } from '../src/ui/target_portrait_view';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/delve-final-four-provenance.json', 'utf8'),
) as {
  entries: { id: string; path: string; sha256: string; master: { path: string; sha256: string } }[];
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original remaining delve target portraits', () => {
  it('covers the two bosses, heroic add and auto companion with distinct artwork', async () => {
    expect(provenance.entries.map((entry) => entry.id)).toEqual([
      'reliquary_bonewalker',
      'deacon_varric',
      'sister_nhalia_drowned_canticle',
      'acolyte_tessa',
    ]);
    expect(COLLAPSED_RELIQUARY_DELVE.bosses).toContain('deacon_varric');
    expect(DROWNED_LITANY_DELVE.bosses).toContain('sister_nhalia_drowned_canticle');
    expect(COLLAPSED_RELIQUARY_DELVE.autoCompanionId).toBe('companion_tessa');
    expect(DELVE_COMPANIONS.companion_tessa.mobTemplateId).toBe('acolyte_tessa');
    expect(readFileSync('src/sim/combat/damage.ts', 'utf8')).toContain(
      "mobId: 'reliquary_bonewalker'",
    );
    for (const entry of provenance.entries) {
      expect(DELVE_MOBS[entry.id]).toBeDefined();
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
