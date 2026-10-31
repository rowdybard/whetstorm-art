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
import { stormBucklerTierItemImageUrl } from '../src/ui/storm_buckler_tier_item_art';

const pieces = [
  ['rare_storm_tuned_buckler', 'rare'],
  ['legendary_storm_tuned_buckler', 'epic'],
] as const;
describe('Storm-Tuned Buckler tier paintings', () => {
  it('maps only rare and Sovereign shield IDs from the live storm table', () => {
    expect(HOARD_BOSS_LOOT_TABLES.rift_boss_storm).toContain('storm_tuned_buckler');
    expect(hoardLootTierForMap('rare')).toBe('rare');
    expect(hoardLootTierForMap('legendary')).toBe('legendary');
    expect(stormBucklerTierItemImageUrl('storm_tuned_buckler')).toBeNull();
    expect(itemImageUrl('storm_tuned_buckler')).toBe(
      '/ui/whetstorm/items/storm_tuned_buckler.webp',
    );
    expect(iconDataUrl('item', 'storm_tuned_buckler')).toBe(
      '/ui/whetstorm/items/storm_tuned_buckler.webp',
    );
    for (const [id, quality] of pieces) {
      expect(HOARD_ITEMS[id]).toMatchObject({
        slot: 'offhand',
        armorType: 'mail',
        shield: true,
        quality,
        relicOf: 'storm_tuned_buckler',
      });
      expect(stormBucklerTierItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('pins two distinct opaque 128px WebPs and their source hashes', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/storm-buckler-tiers/provenance.json', 'utf8'),
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
    const baseHash = sha(readFileSync('public/ui/whetstorm/items/storm_tuned_buckler.webp'));
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(
        `docs/design/whetstorm-art/items/storm-buckler-tiers/${entry.id}.png`,
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
      expect(sha(output)).not.toBe(baseHash);
      hashes.add(sha(output));
    }
    expect(hashes.size).toBe(2);
  });
});
