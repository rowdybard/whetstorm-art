import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ART = [
  ['springmender_helmet', '2dcf1a35cc5e46d0441292b1bb81bcbae085b7a3f122fdc76c36214af53f3cd7', 'e3249c0c32247a02a6df2fa5cbff736196c4862b3108e615b3915686c3fd34a1'],
  ['springmender_shoulder', '2fa21fd991c0216b676c9a4d8d468dc99c1a2eeb8268d8d605fbd90f9d682942', '42e38df3e2135b1771bbb15cb1c41860421895a2d86fd02681458dae4a2c4a22'],
  ['springmender_chest', '20e091e5e86e3178f0a6e9331d22c747f8da977b74a56ae7b4f3f96f46a2372e', 'e61a24f4ffd4f4bb46c2bd48735f99396fc9ca80627ab779ca932418eae847c1'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Springmender armor paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/items/springmender/provenance.md', 'utf8');
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
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/springmender/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
