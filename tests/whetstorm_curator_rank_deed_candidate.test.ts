import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { CURATOR_RANK_DEFS, curatorRankFromOwned } from '../src/sim/reliquary';
import { curatorRankDeedImageUrl } from '../src/ui/curator_rank_deed_art';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const thresholds = [10, 25, 50, 100] as const;
describe('curator rank deed painting candidates', () => {
  it('maps live curator ranks and their exact inclusive thresholds', () => {
    for (const [i, threshold] of thresholds.entries()) {
      const rank = i + 2,
        id = `col_reliquary_rank_${rank}`;
      expect(CURATOR_RANK_DEFS.find((row) => row.rank === rank)).toMatchObject({
        threshold,
        deedId: id,
      });
      expect(curatorRankFromOwned(threshold)).toBe(rank);
      expect(curatorRankFromOwned(threshold - 1)).toBe(rank - 1);
      expect(DEEDS[id].trigger).toEqual({ kind: 'manual' });
      const url = `/ui/whetstorm/deeds/${id}.webp`;
      const crest = `deed_${id}`;
      expect(curatorRankDeedImageUrl(id)).toBe(url);
      expect(earlyDeedImageUrl(id)).toBe(url);
      expect(deedCrestId(id, DEEDS[id].category)).toBe(crest);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
    }
    expect(curatorRankDeedImageUrl('col_reliquary_complete')).toBeNull();
  });
  it('pins four distinct opaque 128px WebPs and their source images', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/deeds/curator-ranks/provenance.json', 'utf8'),
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
      thresholds.map((_, i) => `col_reliquary_rank_${i + 2}`),
    );
    const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(`docs/design/whetstorm-art/deeds/curator-ranks/${entry.id}.png`);
      expect(entry.output).toBe(`public/ui/whetstorm/deeds/${entry.id}.webp`);
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
