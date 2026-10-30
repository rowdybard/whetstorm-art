import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const ART = [
  ['prog_farming_100', '4393710baa4d6bbe3622383747adda8d029baaf0da4cd0761c40b718efc21bdb', 'a639e8b8f94e964bb47a4f8e2ccae4a1ecb00807ed9fc36f5c9724c94a0aa8ff'],
  ['col_farm_roster', 'bb3f83758b55b053ce2c6e339faaa0f3dbc1c689b34692d4cc8961973d43e59b', 'f649e87303d0757837cfe9e1d81a43f5fa30225256f81831fef99de0336820f8'],
  ['prog_field_to_feast', '91bd47bdb77f9f76066179c90852d22021659e806cf0f6d2a9376b0fa7d0a32d', 'b0aaf96ac47186ea0c6078b1eaa093b8fcae1b21f8c5e324ff3d4e0e85e9cda1'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Farming milestone paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/deeds/farming-milestones/provenance.md', 'utf8');
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
    expect(hash(readFileSync(`docs/design/whetstorm-art/deeds/farming-milestones/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
