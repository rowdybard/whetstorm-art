import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ART = [
  ['pattern_duskforged_bulwark', 'b84b61f74548d016a511f538f62184d93682c3fd4a29b28b030e09e9b68b2b7c', '933db84096f965674854fcb8207f220bec2a69c09e39be7cbb61bf871fefed1e'],
  ['pattern_gyrelens_array', '24ad8fce1b6d27336588c874a9f8d497cd5f6aa7e17ec10e9c71ca1d4d772b63', 'c95a74bc8a446b182c2885299b7aa5f46e6be1d6a9735645f987738552dcb0a2'],
  ['pattern_voidbound_grimoire', 'd15a72285859626eb2b62803e045641b96b1ffc6428c72b2b5d13c1c93d932b0', '53f3c3d504fe51a183b2d885f8cd5ec24c1cb9b882b288a35f8e1b843a0da7db'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Nythraxis apex pattern paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/items/nythraxis-apex-patterns/provenance.md', 'utf8');
    for (const [id, master, output] of ART) {
      expect(note).toContain(`## ${id}`);
      expect(note).toContain(master);
      expect(note).toContain(output);
    }
  });
  it.each(ART)('resolves %s to its recorded 128px painting', async (id, master, output) => {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/nythraxis-apex-patterns/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
