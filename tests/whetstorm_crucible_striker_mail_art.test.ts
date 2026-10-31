import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { CRUCIBLE_COLLECTIONS } from '../src/sim/content/crucible_collections';
import { crucibleStrikerMailItemImageUrl } from '../src/ui/crucible_striker_mail_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps the three crafted Striker mail pieces to their recorded paintings', async () => {
  const note = JSON.parse(readFileSync('docs/whetstorm/crucible-striker-mail-original-generation.json', 'utf8'));
  const ids = ['crucible_str_mail_chest', 'crucible_str_mail_waist', 'crucible_str_mail_feet'];
  expect(CRUCIBLE_COLLECTIONS.find((collection) => collection.id === 'crucible_str_mail')?.itemIds).toEqual(ids);
  expect(note.images.map((image: { id: string }) => image.id)).toEqual(ids);
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  expect(new Set(note.images.map((image: { outputSha256: string }) => image.outputSha256)).size).toBe(3);
  for (const image of note.images) {
    expect(crucibleStrikerMailItemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(itemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(iconDataUrl('item', image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(hash(readFileSync(image.master))).toBe(image.masterSha256);
    const output = readFileSync(image.output);
    expect(hash(output)).toBe(image.outputSha256);
    expect(await sharp(output).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleStrikerMailItemImageUrl('unknown')).toBeNull();
});
