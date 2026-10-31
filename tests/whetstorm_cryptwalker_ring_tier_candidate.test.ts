import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  HOARD_BOSS_LOOT_TABLES,
  HOARD_ITEMS,
  hoardLootTierForMap,
} from '../src/sim/content/hoard_loot';
import { cryptwalkerRingTierItemImageUrl } from '../src/ui/cryptwalker_ring_tier_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pieces = [
  ['rare_seal_of_the_cryptwalker', 'rare'],
  ['legendary_seal_of_the_cryptwalker', 'epic'],
] as const;
describe('Cryptwalker ring tier paintings', () => {
  it('maps only rare and Sovereign ring IDs from the live necro table', () => {
    expect(HOARD_BOSS_LOOT_TABLES.rift_boss_necro).toContain('seal_of_the_cryptwalker');
    expect(hoardLootTierForMap('rare')).toBe('rare');
    expect(hoardLootTierForMap('legendary')).toBe('legendary');
    expect(cryptwalkerRingTierItemImageUrl('seal_of_the_cryptwalker')).toBeNull();
    expect(itemImageUrl('seal_of_the_cryptwalker')).toBe(
      '/ui/whetstorm/items/seal_of_the_cryptwalker.webp',
    );
    expect(iconDataUrl('item', 'seal_of_the_cryptwalker')).toBe(
      '/ui/whetstorm/items/seal_of_the_cryptwalker.webp',
    );
    for (const [id, quality] of pieces) {
      expect(HOARD_ITEMS[id]).toMatchObject({
        slot: 'ring',
        quality,
        relicOf: 'seal_of_the_cryptwalker',
      });
      expect(cryptwalkerRingTierItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('pins two distinct opaque 128px WebPs and their source hashes', async () => {
    const provenance = JSON.parse(
      readFileSync(
        'docs/design/whetstorm-art/items/cryptwalker-ring-tiers/provenance.json',
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
    const baseHash = sha(readFileSync('public/ui/whetstorm/items/seal_of_the_cryptwalker.webp'));
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(
        `docs/design/whetstorm-art/items/cryptwalker-ring-tiers/${entry.id}.png`,
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
