import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { WORLD_QUEST_ESCORTS } from '../src/sim/content/world_quests';

const ids = ['eastbrook_freight_caravan', 'willowfen_remedy_caravan', 'frostveil_supply_caravan'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/world-quest-caravans-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('World quest caravan portraits', () => {
  it('covers the three live escort entities', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    const escortIds = Object.values(WORLD_QUEST_ESCORTS).map((escort) => escort.npcMobId);
    for (const id of ids) expect(escortIds).toContain(id);
  });

  it('pins distinct shipping images and original masters', async () => {
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
