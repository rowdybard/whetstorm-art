import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  HOARD_BOSS_LOOT_TABLES,
  HOARD_ITEMS,
  hoardLootTierForMap,
} from '../src/sim/content/hoard_loot';
import { eventHorizonCowlItemImageUrl } from '../src/ui/event_horizon_cowl_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pieces = [
  ['rare_cowl_of_event_horizon', 'rare'],
  ['cowl_of_event_horizon', 'epic'],
  ['legendary_cowl_of_event_horizon', 'epic'],
] as const;
describe('Event Horizon cowl tier paintings', () => {
  it('maps all three live arcane boss cloth helmet IDs', () => {
    expect(HOARD_BOSS_LOOT_TABLES.rift_boss_arcane).toContain('cowl_of_event_horizon');
    expect(hoardLootTierForMap('rare')).toBe('rare');
    expect(hoardLootTierForMap('epic')).toBe('epic');
    expect(hoardLootTierForMap('legendary')).toBe('legendary');
    for (const [id, quality] of pieces) {
      expect(HOARD_ITEMS[id]).toMatchObject({ slot: 'helmet', armorType: 'cloth', quality });
      expect(eventHorizonCowlItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(eventHorizonCowlItemImageUrl('rare_mantle_of_singularity')).toBeNull();
  });
  it('pins three distinct opaque 128px WebPs and their source hashes', async () => {
    const provenance = JSON.parse(
      readFileSync(
        'docs/design/whetstorm-art/items/event-horizon-cowl-tiers/provenance.json',
        'utf8',
      ),
    ) as {
      entries: {
        id: string;
        source: string;
        sourceSha256: string;
        output: string;
        outputSha256: string;
      }[];
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(pieces.map(([id]) => id));
    const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(
        `docs/design/whetstorm-art/items/event-horizon-cowl-tiers/${entry.id}.png`,
      );
      expect(entry.output).toBe(`public/ui/whetstorm/items/${entry.id}.webp`);
      const source = readFileSync(entry.source),
        output = readFileSync(entry.output);
      expect(sha(source)).toBe(entry.sourceSha256);
      expect(sha(output)).toBe(entry.outputSha256);
      const meta = await sharp(output).metadata();
      expect([meta.format, meta.width, meta.height, meta.hasAlpha]).toEqual([
        'webp',
        128,
        128,
        false,
      ]);
      hashes.add(sha(output));
    }
    expect(hashes.size).toBe(3);
  });
});
