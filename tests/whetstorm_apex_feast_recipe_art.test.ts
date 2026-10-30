import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ART = [
  ['pattern_stonepot_feast', '16213a23d1b30261740e9c6dda45b0ca399abe3281367c09c452e66fd8c666ee', '967b8c46b7b9101bf01e73868b46b8df83543b805422352c916f2c5395f67741'],
  ['pattern_warspice_feast', '59a2a745337161cd4d6e48186481f6847c781e196ea400d5eab85c6ad839623c', '312eea9510cf274b541c8586fc750f29db5ac603640cc8f16f5f74a9ada2217b'],
  ['pattern_sageleaf_feast', 'f11d907dc07c524861b7bfac9bbe0d5e0945c53974f9fdc88e048c0020130f34', '5798d44f635b6da2807dc68f1c390eeafcf4ddfccea619c7b86aa8320ae7930d'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Apex feast recipe paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/items/apex-feast-recipes/provenance.md', 'utf8');
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
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/apex-feast-recipes/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
