import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ART = [
  ['emberscreed_shoulder', '814d72fcf2e9564a628659651f0bdbfbcdec63517e3c6efba1a5e798fbe8ad8f', '4303ff56006dd2057e3930272aae9e6c19c26320d521458a7a51c5f118926044'],
  ['emberscreed_chest', '929c827071723518c9c1f8654fd0345ad88ea21c334b84885b30771f39305b2d', 'c63367fd0760084dcf84bd83c0a6405a5177f2d309145a641429fea5a7e33878'],
  ['emberscreed_gloves', '38a06d433e42affe7d0dac6f38bca765e11a802280dcc3d534cd790bd2bae150', '4c3f5e489f27e6971ac43c0ba6e7b79617601ba57c0df498bc2ec9d21f584f9f'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Emberscreed armor paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/items/emberscreed/provenance.md', 'utf8');
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
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/emberscreed/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
