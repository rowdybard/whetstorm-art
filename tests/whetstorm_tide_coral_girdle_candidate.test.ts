import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  HOARD_BOSS_LOOT_TABLES,
  HOARD_ITEMS,
  hoardLootTierForMap,
} from '../src/sim/content/hoard_loot';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { tideCoralGirdleItemImageUrl } from '../src/ui/tide_coral_girdle_item_art';

const pieces = [
  ['rare_coral_encrusted_girdle', 'rare'],
  ['coral_encrusted_girdle', 'epic'],
  ['legendary_coral_encrusted_girdle', 'epic'],
] as const;
describe('Coral-Encrusted Girdle tier paintings', () => {
  it('maps all three live tide boss waist armor IDs', () => {
    expect(HOARD_BOSS_LOOT_TABLES.rift_boss_tide).toContain('coral_encrusted_girdle');
    expect(hoardLootTierForMap('rare')).toBe('rare');
    expect(hoardLootTierForMap('epic')).toBe('epic');
    expect(hoardLootTierForMap('legendary')).toBe('legendary');
    for (const [id, quality] of pieces) {
      expect(HOARD_ITEMS[id]).toMatchObject({ slot: 'waist', armorType: 'mail', quality });
      expect(tideCoralGirdleItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(tideCoralGirdleItemImageUrl('rare_riptide_handwraps')).toBeNull();
  });
  it('pins three distinct opaque 128px WebPs and their source hashes', async () => {
    const provenance = JSON.parse(
      readFileSync(
        'docs/design/whetstorm-art/items/tide-coral-girdle-tiers/provenance.json',
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
        `docs/design/whetstorm-art/items/tide-coral-girdle-tiers/${entry.id}.png`,
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
