import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  HOARD_BOSS_LOOT_TABLES,
  HOARD_ITEMS,
  hoardLootTierForMap,
} from '../src/sim/content/hoard_loot';
import { graskEpicItemImageUrl } from '../src/ui/grask_epic_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pieces = [
  ['breastplate_tectonic_might', 'chest', 'mail'],
  ['monolithic_shoulderguards', 'shoulder', 'leather'],
  ['earthshaker_warboots', 'feet', 'mail'],
] as const;
describe('Grask hoard paintings', () => {
  it('maps all three tiers in the live brute table', () => {
    expect(hoardLootTierForMap('epic')).toBe('epic');
    for (const [id, slot, armorType] of pieces) {
      expect(HOARD_BOSS_LOOT_TABLES.rift_boss_brute).toContain(id);
      expect(HOARD_ITEMS[id]).toMatchObject({ slot, armorType, quality: 'epic' });
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(graskEpicItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
      const rare = `rare_${id}`;
      const rareUrl = `/ui/whetstorm/items/${rare}.webp`;
      expect(HOARD_ITEMS[rare]).toMatchObject({ slot, armorType, quality: 'rare' });
      expect(graskEpicItemImageUrl(rare)).toBe(rareUrl);
      expect(itemImageUrl(rare)).toBe(rareUrl);
      expect(iconDataUrl('item', rare)).toBe(rareUrl);
      expect(rareUrl).not.toBe(url);
      const sovereign = `legendary_${id}`;
      const sovereignUrl = `/ui/whetstorm/items/${sovereign}.webp`;
      expect(HOARD_ITEMS[sovereign]).toMatchObject({ slot, armorType, quality: 'epic' });
      expect(graskEpicItemImageUrl(sovereign)).toBe(sovereignUrl);
      expect(itemImageUrl(sovereign)).toBe(sovereignUrl);
      expect(iconDataUrl('item', sovereign)).toBe(sovereignUrl);
      expect(new Set([url, rareUrl, sovereignUrl]).size).toBe(3);
    }
  });
  it('pins Sovereign sources and outputs as distinct 128px WebPs', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/grask-sovereign/provenance.json', 'utf8'),
    ) as {
      entries: {
        id: string;
        source: string;
        sourceSha256: string;
        output: string;
        outputSha256: string;
      }[];
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(
      pieces.map(([id]) => `legendary_${id}`),
    );
    const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(`docs/design/whetstorm-art/items/grask-sovereign/${entry.id}.png`);
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
      const base = entry.id.slice('legendary_'.length);
      for (const prefix of ['', 'rare_'])
        expect(sha(output)).not.toBe(
          sha(readFileSync(`public/ui/whetstorm/items/${prefix}${base}.webp`)),
        );
      hashes.add(sha(output));
    }
    expect(hashes.size).toBe(3);
  });
  it('pins all Tarnished source and output hashes and distinct 128px WebPs', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/grask-tarnished/provenance.json', 'utf8'),
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
      expect(entry.source).toBe(`docs/design/whetstorm-art/items/grask-tarnished/${entry.id}.png`);
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
      expect(sha(output)).not.toBe(
        sha(readFileSync(`public/ui/whetstorm/items/${entry.id.slice(5)}.webp`)),
      );
    }
    expect(hashes.size).toBe(3);
  });
  it('pins distinct opaque 128px WebPs and source hashes', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/grask-epic/provenance.json', 'utf8'),
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
      expect(entry.source).toBe(`docs/design/whetstorm-art/items/grask-epic/${entry.id}.png`);
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
