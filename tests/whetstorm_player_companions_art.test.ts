import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/content/classes';
import { DELVE_COMPANIONS, DELVE_MOBS, DROWNED_LITANY_DELVE } from '../src/sim/content/delves';
import { MAGE_PET_MOBS } from '../src/sim/content/mage_pets';
import { WARLOCK_PET_MOBS } from '../src/sim/content/warlock_pets';
import { targetPortraitUrl } from '../src/ui/target_portrait_view';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/player-companions-provenance.json', 'utf8'),
) as {
  entries: { id: string; path: string; sha256: string; master: { path: string; sha256: string } }[];
};
const digest = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original player companion portraits', () => {
  it('covers live summoned pets and the Drowned Litany companion with distinct art', async () => {
    expect(provenance.entries.map((entry) => entry.id)).toEqual([
      'emberkin',
      'gloomshade',
      'water_elemental',
      'edda_reedhand',
    ]);
    for (const [ability, id] of [
      ['summon_imp', 'emberkin'],
      ['summon_voidwalker', 'gloomshade'],
      ['summon_water_elemental', 'water_elemental'],
    ]) {
      expect(ABILITIES[ability].effects).toContainEqual({ type: 'summonDemon', mobId: id });
      expect({ ...WARLOCK_PET_MOBS, ...MAGE_PET_MOBS }[id]).toBeDefined();
    }
    expect(DROWNED_LITANY_DELVE.autoCompanionId).toBe('companion_edda');
    expect(DELVE_COMPANIONS.companion_edda.mobTemplateId).toBe('edda_reedhand');
    expect(DELVE_MOBS.edda_reedhand).toBeDefined();
    for (const entry of provenance.entries) {
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
