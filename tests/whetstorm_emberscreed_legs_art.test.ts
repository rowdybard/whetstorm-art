import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('resolves Emberscreed legs to the recorded 128px painting', async () => {
  const id = 'emberscreed_legs';
  const url = `/ui/whetstorm/items/${id}.webp`;
  const master = '4b69c897fbc4afd1298e16afdf26acc1671036539b588a965ab57a0f7b094c32';
  const output = '480b101c5e7c502f9540e84fbd17aea4048ebda8149ecac906050c06104666f1';
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  const note = readFileSync('docs/design/whetstorm-art/items/emberscreed-legs/provenance.md', 'utf8');
  expect(note).toContain(master);
  expect(note).toContain(output);
  expect(itemImageUrl(id)).toBe(url);
  expect(iconDataUrl('item', id)).toBe(url);
  expect(hash(readFileSync(`docs/design/whetstorm-art/items/emberscreed-legs/${id}.png`))).toBe(master);
  const bytes = readFileSync(`public${url}`);
  expect(hash(bytes)).toBe(output);
  expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
});
