import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const ART = [
  ['weaponcrafting', 'e2283a89e38548e933ed85968f8c8c8a779be36dd9fa6938f03e95f8365ef11f', 'bd422159c3223f2fdc14306e4721720666c320e9d12079d83437531d870462dc'],
  ['armorcrafting', '7f8f29108887a028127258dffd0e671a2217c3adda5e9f174fdffe2502ff2d18', '9b2b3f4d2f02e296efac6f5e5f5a3e0b162473cc7b2ba3e6cc383b0e28ca4b2c'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Grandmaster smithing paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/deeds/grandmaster-smithing/provenance.md', 'utf8');
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
    expect(hash(readFileSync(`docs/design/whetstorm-art/deeds/grandmaster-smithing/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
