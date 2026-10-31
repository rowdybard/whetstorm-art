import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  HOARD_BOSS_LOOT_TABLES,
  HOARD_ITEMS,
  hoardLootTierForMap,
} from '../src/sim/content/hoard_loot';
import { boneLegionEpicItemImageUrl } from '../src/ui/bone_legion_epic_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pieces = [
  ['bone_studded_pauldrons', 'shoulder', 'mail'],
  ['legguards_of_the_ossuary', 'legs', 'leather'],
  ['ossuary_bone_crown', 'helmet', 'cloth'],
] as const;
describe('epic bone legion hoard armor paintings', () => {
  it('maps all three tiers on the live necro boss table', () => {
    expect(hoardLootTierForMap('epic')).toBe('epic');
    for (const [id, slot, armorType] of pieces) {
      expect(HOARD_BOSS_LOOT_TABLES.rift_boss_necro).toContain(id);
      expect(HOARD_ITEMS[id]).toMatchObject({ slot, armorType, quality: 'epic' });
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(boneLegionEpicItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
      const rare = `rare_${id}`;
      const rareUrl = `/ui/whetstorm/items/${rare}.webp`;
      expect(HOARD_ITEMS[rare]).toMatchObject({ slot, armorType, quality: 'rare' });
      expect(boneLegionEpicItemImageUrl(rare)).toBe(rareUrl);
      expect(itemImageUrl(rare)).toBe(rareUrl);
      expect(iconDataUrl('item', rare)).toBe(rareUrl);
      expect(rareUrl).not.toBe(url);
      const sovereign = `legendary_${id}`;
      const sovereignUrl = `/ui/whetstorm/items/${sovereign}.webp`;
      expect(HOARD_ITEMS[sovereign]).toMatchObject({ slot, armorType, quality: 'epic' });
      expect(boneLegionEpicItemImageUrl(sovereign)).toBe(sovereignUrl);
      expect(itemImageUrl(sovereign)).toBe(sovereignUrl);
      expect(iconDataUrl('item', sovereign)).toBe(sovereignUrl);
      expect(new Set([url, rareUrl, sovereignUrl]).size).toBe(3);
    }
  });
  it('pins Sovereign sources and distinct opaque 128px WebPs', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/bone-legion-sovereign/provenance.json', 'utf8'),
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
      expect(entry.source).toBe(
        `docs/design/whetstorm-art/items/bone-legion-sovereign/${entry.id}.png`,
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
      const base = entry.id.slice('legendary_'.length);
      for (const prefix of ['', 'rare_'])
        expect(sha(output)).not.toBe(
          sha(readFileSync(`public/ui/whetstorm/items/${prefix}${base}.webp`)),
        );
      hashes.add(sha(output));
    }
    expect(hashes.size).toBe(3);
  });
  it('pins Tarnished source and output hashes and distinct opaque 128px WebPs', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/bone-legion-tarnished/provenance.json', 'utf8'),
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
        `docs/design/whetstorm-art/items/bone-legion-tarnished/${entry.id}.png`,
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
      readFileSync('docs/design/whetstorm-art/items/bone-legion-epic/provenance.json', 'utf8'),
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
      expect(entry.source).toBe(`docs/design/whetstorm-art/items/bone-legion-epic/${entry.id}.png`);
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
