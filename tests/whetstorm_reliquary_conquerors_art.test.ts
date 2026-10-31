import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

it('resolves the Conquerors shelf to its recorded 128px painting', async () => {
  const id = 'col_reliquary_conquerors';
  const url = `/ui/whetstorm/deeds/${id}.webp`;
  const masterHash = '75e693039fddd8c8609d1c0f3e0957bca067d605716d2bf9508d95d010702adf';
  const outputHash = '901ce21246d59183ac7e29326287153d4abc96aaeab3ed6ee855c3eea9ef6c90';
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/deeds/collection-milestones/conquerors-provenance.md', 'utf8');
  expect(note).toContain(masterHash);
  expect(note).toContain(outputHash);
  expect(deedImageUrl(`deed_${id}`)).toBe(url);
  expect(iconDataUrl('crest', `deed_${id}`)).toBe(url);
  expect(hash(readFileSync(`docs/design/whetstorm-art/deeds/collection-milestones/${id}.png`))).toBe(masterHash);
  const bytes = readFileSync(`public${url}`);
  expect(hash(bytes)).toBe(outputHash);
  expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
});
