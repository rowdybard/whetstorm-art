import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ART = [
  ['pattern_crucible_healer_leather', 'cdcb8147be0ab756bf72f9c8e1756dd4bd34bc7d3a5ec160d85b70f16eabcd5e', 'c11a838be13b832c913226d390ad1b9ea102c6d58c3609f99e8e1f4667cad750'],
  ['pattern_crucible_caster_cloth', '605c71b47c1f0bfb367bd3d8766804bf099801bcbe85a1269a0301034c811e84', 'cd3f93a06b9abe22800be1a0089567b428c0289e57d6867e6103234b68ef0630'],
  ['pattern_crucible_healer_cloth', '61774b4ad55250c5d29144ea4eb0251af9f8f801ea12a0f0454ab5c084f33f97', 'f89e9ca4fcb9f473b1b35955870d0e033c7ff5109417fbafe9991abf72c857c4'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Crucible healer and cloth manuals', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/items/crucible-healer-cloth/provenance.md', 'utf8');
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
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/crucible-healer-cloth/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
