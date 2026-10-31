import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { cinderFirstDesignItemImageUrl } from '../src/ui/cinder_first_design_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps the heroic Cinder offhand to its recorded painting', async () => {
  const id = 'cinder_of_the_first_design';
  const note = JSON.parse(readFileSync('docs/whetstorm/cinder-first-design-original-generation.json', 'utf8'));
  const [image] = note.images;
  expect(ITEMS[id]).toMatchObject({ kind: 'held_offhand', slot: 'offhand', quality: 'epic' });
  expect(image.id).toBe(id);
  expect(cinderFirstDesignItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
  expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
  expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
  expect(cinderFirstDesignItemImageUrl('unknown')).toBeNull();
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  expect(image.masterSha256).toBe('072e5260113b768cd1b7d2c9fcb1bab6acf9da7c79b6a99b681e33fc584bfc93');
  expect(image.outputSha256).toBe('e21d7453a02984e46d2d5e5c788b3a9f1ee7ed17aa1bbb8d29f4daf32bf24e1c');
  expect(hash(readFileSync(image.master))).toBe(image.masterSha256);
  const output = readFileSync(image.output);
  expect(hash(output)).toBe(image.outputSha256);
  expect(await sharp(output).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
});
