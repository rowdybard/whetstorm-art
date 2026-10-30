import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { FROSTVEIL_MOBS } from '../src/sim/content/frostveil';
import { WORLD_QUEST_ZONE_HUNTS } from '../src/sim/content/world_quest_zone_hunts';
import { worldQuestOffersChampion } from '../src/sim/world_quest_champion';

const ids = ['terrace_howler', 'ice_wisp', 'rime_elemental', 'fen_sprite'];
const ledger = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/frostveil-quest-champions-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Frostveil world quest champion portraits', () => {
  it('covers four actual champion templates and pins each independent master and asset', async () => {
    expect(ledger.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    for (const entry of ledger.entries) {
      const quest = WORLD_QUEST_ZONE_HUNTS.find(
        (candidate) =>
          candidate.objective.type === 'kill' && candidate.objective.targetMobId === entry.id,
      );
      expect(quest).toBeDefined();
      if (!quest) throw new Error(`Missing quest for ${entry.id}`);
      expect(worldQuestOffersChampion(quest)).toBe(true);
      expect(FROSTVEIL_MOBS[entry.id]).toBeDefined();
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
      const asset = readFileSync(entry.path);
      const master = readFileSync(entry.master.path);
      expect(digest(asset)).toBe(entry.sha256);
      expect(asset.length).toBe(entry.bytes);
      expect(digest(master)).toBe(entry.master.sha256);
      expect(master.length).toBe(entry.master.bytes);
      expect(await sharp(asset).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      const metadata = await sharp(master).metadata();
      expect(metadata.format).toBe('png');
      expect(metadata.width).toBeGreaterThanOrEqual(512);
      expect(metadata.height).toBeGreaterThanOrEqual(512);
    }
    expect(new Set(ledger.entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(
      ids.length,
    );
  });
});
