import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  HOARD_BOSS_LOOT_TABLES,
  HOARD_ITEMS,
  hoardLootTierForMap,
} from '../src/sim/content/hoard_loot';
import { hoarfrostEpicItemImageUrl } from '../src/ui/hoarfrost_epic_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const pieces = [
  ['permafrost_legguards', 'legs', 'mail'],
  ['frostbitten_rime_slippers', 'feet', 'cloth'],
  ['rime_crusted_grips', 'gloves', 'leather'],
] as const;
describe('Tarnished Hoarfrost hoard paintings', () => {
  it('routes distinct rare-tier paintings separately from Sovereign', () => {
    expect(hoardLootTierForMap('rare')).toBe('rare');
    expect(hoardLootTierForMap('common')).toBe('rare');
    for (const [base, slot, armorType] of pieces) {
      const id = `rare_${base}`,
        url = `/ui/whetstorm/items/${id}.webp`;
      expect(HOARD_BOSS_LOOT_TABLES.rift_boss_frost).toContain(base);
      expect(HOARD_ITEMS[id]).toMatchObject({ slot, armorType, quality: 'rare', relicOf: base });
      expect(hoarfrostEpicItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
      expect(itemImageUrl(base)).not.toBe(url);
      expect(hoarfrostEpicItemImageUrl(`legendary_${base}`)).toBe(
        `/ui/whetstorm/items/legendary_${base}.webp`,
      );
      expect(itemImageUrl(`legendary_${base}`)).not.toBe(url);
    }
  });
  it('pins three distinct opaque 128px WebPs and their source images', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/hoarfrost-rare/provenance.json', 'utf8'),
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
      expect(entry.source).toBe(`docs/design/whetstorm-art/items/hoarfrost-rare/${entry.id}.png`);
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
