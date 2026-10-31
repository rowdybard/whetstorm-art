import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { CRUCIBLE_COLLECTIONS } from '../src/sim/content/crucible_collections';
import { crucibleProwlerLeatherItemImageUrl } from '../src/ui/crucible_prowler_leather_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps the crafted Prowler leather pieces to their recorded paintings', async () => {
  const note = JSON.parse(readFileSync('docs/whetstorm/crucible-prowler-leather-original-generation.json', 'utf8'));
  const ids = ['crucible_str_leather_chest', 'crucible_str_leather_waist', 'crucible_str_leather_feet'];
  expect(CRUCIBLE_COLLECTIONS.find((collection) => collection.id === 'crucible_str_leather')?.itemIds).toEqual(ids);
  expect(note.images.map((image: { id: string }) => image.id)).toEqual(ids);
  expect(note.images[2].masterSha256).toBe('a419bb94403045dadf9399e4153156781ab09b8818909729175686ec0f8010b1');
  expect(note.images[2].outputSha256).toBe('e5c76a61b53daf475ff52a52f620776f34420996e2112553a3d95116c03ea76a');
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  expect(new Set(note.images.map((image: { outputSha256: string }) => image.outputSha256)).size).toBe(3);
  for (const image of note.images) {
    expect(crucibleProwlerLeatherItemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(itemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(iconDataUrl('item', image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(hash(readFileSync(image.master))).toBe(image.masterSha256);
    const output = readFileSync(image.output);
    expect(hash(output)).toBe(image.outputSha256);
    expect(await sharp(output).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleProwlerLeatherItemImageUrl('unknown')).toBeNull();
});
