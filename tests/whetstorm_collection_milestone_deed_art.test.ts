import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const ART = [
  ['col_reliquary_illum_nythraxis_heroic', '5e48fc6f575aae6006a0ddfd45a7ef9c47928876a94d81c57ebf7e6827eac757', '3fd0be10a47da10ad4cd60d58d8c3691e3c5115e75034989e1a686f1395b73d5'],
  ['col_reliquary_illum_thunzharr', 'a107a224a17b4ffb64011477c793cb050978d6d6fa3d41041b45cc39a10592f6', '0fd676cc6b58774ffc4f21e917808e47f146c3aa40f38546172b29b0fc55e8b0'],
  ['col_reliquary_illum_gravewyrm_heroic', '665ba33b52606a2c893f1ba0ed964d48a109101c7bbab851a8e3242ac68ea5af', '8c8672b02089a7c051b86ed938a96a98b3e51f40246d7737be2c4a04d3a9d870'],
  ['col_quartermaster_buyout', 'e242222c217fe5397b48350ff419e55f7e795f724480f228b2c7576ebe30ccdc', 'ae9a94a0262744b7495431a44a2049ea32aa990986b91519a3df135f5f2afe9d'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Collection milestone paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/deeds/collection-milestones/provenance.md', 'utf8');
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
    expect(hash(readFileSync(`docs/design/whetstorm-art/deeds/collection-milestones/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
