import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  RELIQUARY_SPECIMEN_GLYPH_URL,
  reliquaryCellArt,
  reliquaryCellArtOpaque,
} from '../src/ui/reliquary_cell_art';

describe('original Reliquary specimen art', () => {
  it('resolves the specimen with its decode fallback and transparent silhouette treatment', async () => {
    const art = reliquaryCellArt({ kind: 'mark', id: 'gather_event:perfect_specimen' });
    expect(art).toEqual({
      kind: 'url',
      url: '/ui/whetstorm/reliquary/perfect_specimen.svg',
      fallbackUrl: RELIQUARY_SPECIMEN_GLYPH_URL,
    });
    expect(art && reliquaryCellArtOpaque(art)).toBe(false);
    expect(reliquaryCellArt({ kind: 'mark', id: 'gather_event:unknown' })).toBeNull();
    const provenance = JSON.parse(
      readFileSync('docs/whetstorm/reliquary-specimen-original-art.json', 'utf8'),
    );
    const record = provenance.records[0];
    expect(record.id).toBe('gather_event:perfect_specimen');
    expect(record.path).toBe('public/ui/whetstorm/reliquary/perfect_specimen.svg');
    const bytes = readFileSync(record.path);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256);
    for (const size of [16, 32, 48]) {
      const { data, info } = await sharp(bytes)
        .resize(size, size)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      expect(data[3]).toBe(0);
      expect(
        data[(Math.floor(size / 2) * info.width + Math.floor(size / 2)) * 4 + 3],
      ).toBeGreaterThan(0);
    }
  });
});
