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
import { vysskaEpicItemImageUrl } from '../src/ui/vysska_epic_item_art';

const pieces = [
  ['silkstalker_woven_vest', 'chest', 'leather'],
  ['spun_venom_spaulders', 'shoulder', 'leather'],
  ['broodmother_chitin_cowl', 'helmet', 'leather'],
  ['venom_etched_waistcord', 'waist', 'cloth'],
] as const;
describe('epic Vysska hoard armor paintings', () => {
  it('maps only the four epic IDs on the live venom boss table', () => {
    expect(hoardLootTierForMap('epic')).toBe('epic');
    for (const [id, slot, armorType] of pieces) {
      expect(HOARD_BOSS_LOOT_TABLES.rift_boss_venom).toContain(id);
      expect(HOARD_ITEMS[id]).toMatchObject({ slot, armorType, quality: 'epic' });
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(vysskaEpicItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
      for (const tier of ['rare', 'legendary']) {
        const variant = `${tier}_${id}`;
        expect(vysskaEpicItemImageUrl(variant)).toBeNull();
        expect(itemImageUrl(variant)).not.toBe(url);
        expect(iconDataUrl('item', variant)).not.toBe(url);
      }
    }
  });
  it('pins four distinct opaque WebPs and their source hashes', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/vysska-epic/provenance.json', 'utf8'),
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
      expect(entry.source).toBe(`docs/design/whetstorm-art/items/vysska-epic/${entry.id}.png`);
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
    expect(hashes.size).toBe(4);
  });
});
