import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ART = [
  ['pattern_wyrmfall_pendant', 'ec3e4b2f63aafc6b964860fc79567c7856805e22aab6b732063caa31509b5852', 'd63cc7842d22e0c02ba03f7e1620bdf2a26b4a3f46abbd1675cf2e362db45ea2'],
  ['pattern_warhewn_signet', 'cb9e3850a73553625370305cb664b07a0ab24f4891f1fa7e2c002266dadf65dc', 'f52edb382e5d357fce5033bcf3c31597ae664b973afcc0f17e3a59ef53141b9b'],
  ['pattern_prismglass_loop', '02d202ce1d5db5973e3eea4f445644b7b07f4693aa8361ebf30bed3b65452650', 'e79cb271e5309f93d3fc4a259a02d43b1f587561c35eebe0d2d08b6634f3763f'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Nythraxis jewelcraft pattern paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/items/nythraxis-jewel-patterns/provenance.md', 'utf8');
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
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/nythraxis-jewel-patterns/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
