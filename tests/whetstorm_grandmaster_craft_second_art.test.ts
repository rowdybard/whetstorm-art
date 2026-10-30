import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const ART = [
  ['engineering', 'a8da3d6ba41b9b91eae23304a4c844c563623c7ab6d163ca9400be177a6d80a8', 'a0ac75e980ad497e636ff7cf1d306908cfbfbfa21ff46fcf412fdde00842b895'],
  ['leatherworking', '80dde2c7abec9cfdb1a3ab940372bc9d2cabc704e5f76818861ecb5754ed43ba', 'a0427ba5c0558a5d9eb3b5ca90935a55a68cf0d032635ec6dfba77d9743229ba'],
  ['tailoring', 'bce52ed161614354902f16b42621fb8727f43a81d28da3233e38efdce718722d', '75ce516123b3a88bb6931ab4e27b9282212de281921920a953b5fb3d716be002'],
  ['jewelcrafting', '8c375d661ed28b18a9ff169e028f168293afbea0687c03973a8560f21475b4fc', 'e23f05d8049fa5fbe9fbb94a909696cde1db36f45e626eef02d9e6ff588eff98'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Grandmaster craft second batch', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/deeds/grandmaster-craft-second/provenance.md', 'utf8');
    for (const [craft, master, output] of ART) {
      expect(note).toContain(`## prog_grandmaster_${craft}`);
      expect(note).toContain(master);
      expect(note).toContain(output);
    }
  });
  it.each(ART)('resolves %s to its recorded 128px painting', async (craft, master, output) => {
    const id = `prog_grandmaster_${craft}`;
    const url = `/ui/whetstorm/deeds/${id}.webp`;
    expect(deedImageUrl(`deed_${id}`)).toBe(url);
    expect(iconDataUrl('crest', `deed_${id}`)).toBe(url);
    expect(hash(readFileSync(`docs/design/whetstorm-art/deeds/grandmaster-craft-second/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
