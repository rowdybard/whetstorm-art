import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('resolves Dawnweave legs to the recorded 128px painting', async () => {
  const id = 'benison_dawnweave_legs';
  const url = `/ui/whetstorm/items/${id}.webp`;
  const master = 'c6cae12e4c953c61f08e9b30fc200cf16245bbd7bed471dba0edd3e107558fbb';
  const output = 'f99da8a44b776c415bfab131fbc44b84f7117a89b069176c0b03b08c0c6e5463';
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/dawnweave-legs/provenance.md', 'utf8');
  expect(note).toContain(master);
  expect(note).toContain(output);
  expect(itemImageUrl(id)).toBe(url);
  expect(iconDataUrl('item', id)).toBe(url);
  expect(hash(readFileSync(`docs/design/whetstorm-art/items/dawnweave-legs/${id}.png`))).toBe(master);
  const bytes = readFileSync(`public${url}`);
  expect(hash(bytes)).toBe(output);
  expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
});
