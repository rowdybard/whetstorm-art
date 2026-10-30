import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const ART = [
  ['chr_palmreach_first_cast', 'ca999715f01df82f4f6230f63645e4deebc9f29c4c72e1a16048cfc673b2003b', '81025d7c6b905f16b245e498f3668d1ef6630fba88f15aef0fa5c7aa122304e2'],
  ['chr_palmreach_gatherer', '5d1d194fb7888f6d1e36086c40ab1ab01b96abd711536998be1dc5a606cbc4c3', 'bcc973d1f5780b89aeb050b28297ebbf64e3b6a737bf72ae80d760799f638a2f'],
  ['prog_master_angler', 'd5da2b2a705fa50a331ae6dd757caf6a7c35926de24426bb622310cb47326087', 'f80862f740e8ad21699d32c164a3dffdba65d50591fdb3aaf6af3721bc66d3ec'],
  ['col_deepest_cast', 'fd26c6f7cb9d64f62e2c0a2b58024d544364bf32960d4b906c5ad526efb240ca', 'ecbc920b0d31eff3905da0292a91801935925470598451a7fbdda83853f58deb'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Palmreach and fishing deed paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/deeds/palmreach-fishing/provenance.md', 'utf8');
    for (const [id, master, output] of ART) {
      expect(note).toContain(`## ${id}`);
      expect(note).toContain(master);
      expect(note).toContain(output);
    }
  });
  it.each(ART)('resolves %s to its recorded 128px painting', async (id, master, output) => {
    const url = `/ui/whetstorm/deeds/${id}.webp`;
    expect(deedImageUrl(`deed_${id}`)).toBe(url);
    expect(iconDataUrl('crest', `deed_${id}`)).toBe(url);
    expect(hash(readFileSync(`docs/design/whetstorm-art/deeds/palmreach-fishing/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
