import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  INVESTIGATION_MOB,
  WORLD_QUEST_INVESTIGATION,
} from '../src/sim/content/world_quest_investigation';
import { WORLD_QUEST_ESCORTS } from '../src/sim/content/world_quests';

const ids = ['fenbridge_infiltrator', 'bogtoad', 'willow_sprite', 'snowdrift_wolf'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/world-quest-event-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('World quest event target portraits', () => {
  it('covers the investigation reveal and caravan ambushes', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(INVESTIGATION_MOB.id).toBe(ids[0]);
    expect(WORLD_QUEST_INVESTIGATION.objective.targetMobId).toBe(ids[0]);
    const ambushIds = Object.values(WORLD_QUEST_ESCORTS).flatMap((escort) =>
      escort.ambushes.map((ambush) => ambush.mobId),
    );
    for (const id of ids.slice(1)) expect(ambushIds).toContain(id);
  });

  it('pins distinct shipping images and their original masters', async () => {
    const hashes = new Set<string>();
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
      const metadata = await sharp(webp).metadata();
      expect([metadata.format, metadata.width, metadata.height]).toEqual(['webp', 128, 128]);
      expect((await sharp(master).metadata()).width).toBeGreaterThanOrEqual(512);
      hashes.add(entry.sha256);
    }
    expect(hashes.size).toBe(ids.length);
  });
});
