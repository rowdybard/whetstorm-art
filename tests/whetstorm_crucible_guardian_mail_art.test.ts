import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { CRUCIBLE_COLLECTIONS } from '../src/sim/content/crucible_collections';
import { crucibleGuardianMailItemImageUrl } from '../src/ui/crucible_guardian_mail_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps the three crafted Guardian mail pieces to their recorded paintings', async () => {
  const note = JSON.parse(readFileSync('docs/whetstorm/crucible-guardian-mail-original-generation.json', 'utf8'));
  const ids = ['crucible_tank_mail_chest', 'crucible_tank_mail_waist', 'crucible_tank_mail_feet'];
  expect(CRUCIBLE_COLLECTIONS.find((collection) => collection.id === 'crucible_tank_mail')?.itemIds).toEqual(ids);
  expect(note.images.map((image: { id: string }) => image.id)).toEqual(ids);
  expect(note.images[2].masterSha256).toBe('6181a126196a759e10d03c25b0f9576dcdb8f134a699daa2065fcc3ed41d5e9c');
  expect(note.images[2].outputSha256).toBe('9cf759775a5f805a9a6bd96c87d27a0c37355c5f012632e2891bf17c66ab10e1');
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  expect(new Set(note.images.map((image: { outputSha256: string }) => image.outputSha256)).size).toBe(3);
  for (const image of note.images) {
    expect(crucibleGuardianMailItemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(itemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(iconDataUrl('item', image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(hash(readFileSync(image.master))).toBe(image.masterSha256);
    const output = readFileSync(image.output);
    expect(hash(output)).toBe(image.outputSha256);
    expect(await sharp(output).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleGuardianMailItemImageUrl('unknown')).toBeNull();
});
