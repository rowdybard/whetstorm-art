import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { RIFT_GEM_IDS } from '../src/sim/content/rift/items';
import { RIFT_GEM_RATING_STAT } from '../src/sim/rift/band_ladder';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { riftGemItemImageUrl } from '../src/ui/rift_gem_item_art';

const gems = [
  ['rift_gem_crimson', 'critRating'],
  ['rift_gem_azure', 'hasteRating'],
  ['rift_gem_verdant', 'hitRating'],
] as const;
describe('Rift gem item paintings', () => {
  it('matches the live gem inventory and rating identities', () => {
    expect(RIFT_GEM_IDS).toEqual(gems.map(([id]) => id));
    for (const [id, rating] of gems) {
      expect(RIFT_GEM_RATING_STAT[id]).toBe(rating);
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(riftGemItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
    }
    expect(riftGemItemImageUrl('rift_essence')).toBeNull();
  });
  it('pins three distinct opaque 128px WebPs and their source images', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/items/rift-gems/provenance.json', 'utf8'),
    ) as {
      entries: {
        id: string;
        source: string;
        sourceSha256: string;
        output: string;
        outputSha256: string;
      }[];
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(gems.map(([id]) => id));
    const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(`docs/design/whetstorm-art/items/rift-gems/${entry.id}.png`);
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
