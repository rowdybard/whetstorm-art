import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  HOARD_BOSS_LOOT_TABLES,
  HOARD_ITEMS,
  hoardLootTierForMap,
} from '../src/sim/content/hoard_loot';
import { emberforgeEpicItemImageUrl } from '../src/ui/emberforge_epic_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pieces = [
  ['ember_wrought_crown', 'helmet', 'mail'],
  ['cinder_stitched_robes', 'chest', 'cloth'],
  ['molten_clinker_girdle', 'waist', 'mail'],
] as const;
describe('epic Emberforge hoard armor paintings', () => {
  it('maps epic and Tarnished IDs on the live ember boss table', () => {
    expect(hoardLootTierForMap('epic')).toBe('epic');
    for (const [id, slot, armorType] of pieces) {
      expect(HOARD_BOSS_LOOT_TABLES.rift_boss_ember).toContain(id);
      expect(HOARD_ITEMS[id]).toMatchObject({ slot, armorType, quality: 'epic' });
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(emberforgeEpicItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
      const rare = `rare_${id}`;
      const rareUrl = `/ui/whetstorm/items/${rare}.webp`;
      expect(HOARD_ITEMS[rare]).toMatchObject({ slot, armorType, quality: 'rare', relicOf: id });
      expect(emberforgeEpicItemImageUrl(rare)).toBe(rareUrl);
      expect(itemImageUrl(rare)).toBe(rareUrl);
      expect(iconDataUrl('item', rare)).toBe(rareUrl);
      expect(rareUrl).not.toBe(url);
      const sovereign = `legendary_${id}`;
      expect(emberforgeEpicItemImageUrl(sovereign)).toBeNull();
      expect(itemImageUrl(sovereign)).not.toBe(url);
      expect(itemImageUrl(sovereign)).not.toBe(rareUrl);
      expect(iconDataUrl('item', sovereign)).not.toBe(url);
      expect(iconDataUrl('item', sovereign)).not.toBe(rareUrl);
    }
  });
  it('pins Tarnished source and output hashes and distinct opaque 128px WebPs', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/emberforge-tarnished/provenance.json', 'utf8'),
    ) as {
      entries: {
        id: string;
        source: string;
        sourceSha256: string;
        output: string;
        outputSha256: string;
      }[];
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(pieces.map(([id]) => `rare_${id}`));
    const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(
        `docs/design/whetstorm-art/items/emberforge-tarnished/${entry.id}.png`,
      );
      expect(entry.output).toBe(`public/ui/whetstorm/items/${entry.id}.webp`);
      const output = readFileSync(entry.output);
      expect(sha(readFileSync(entry.source))).toBe(entry.sourceSha256);
      expect(sha(output)).toBe(entry.outputSha256);
      const meta = await sharp(output).metadata();
      expect([meta.format, meta.width, meta.height, meta.hasAlpha]).toEqual([
        'webp',
        128,
        128,
        false,
      ]);
      expect(sha(output)).not.toBe(
        sha(readFileSync(`public/ui/whetstorm/items/${entry.id.slice(5)}.webp`)),
      );
      hashes.add(sha(output));
    }
    expect(hashes.size).toBe(3);
  });
  it('pins three distinct opaque WebPs and their source hashes', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/emberforge-epic/provenance.json', 'utf8'),
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
      expect(entry.source).toBe(`docs/design/whetstorm-art/items/emberforge-epic/${entry.id}.png`);
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
