import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { vesperashUpperItemImageUrl } from '../src/ui/vesperash_upper_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps three Vesperash cloth slots to their recorded original paintings', async () => {
  const note = JSON.parse(readFileSync('docs/whetstorm/vesperash-upper-original-generation.json', 'utf8'));
  const ids = ['vesperash_helmet', 'vesperash_shoulder', 'vesperash_chest'];
  expect(note.images.map((image: { id: string }) => image.id)).toEqual(ids);
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  expect(new Set(note.images.map((image: { outputSha256: string }) => image.outputSha256)).size).toBe(3);
  for (const image of note.images) {
    expect(ITEMS[image.id]).toMatchObject({ kind: 'armor', armorType: 'cloth', set: 'vesperash' });
    expect(vesperashUpperItemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(itemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(iconDataUrl('item', image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(hash(readFileSync(image.master))).toBe(image.masterSha256);
    const output = readFileSync(image.output);
    expect(hash(output)).toBe(image.outputSha256);
    expect(await sharp(output).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(vesperashUpperItemImageUrl('unknown')).toBeNull();
});
