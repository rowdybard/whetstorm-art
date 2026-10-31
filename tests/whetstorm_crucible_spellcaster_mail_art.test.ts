import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { CRUCIBLE_COLLECTIONS } from '../src/sim/content/crucible_collections';
import { crucibleSpellcasterMailItemImageUrl } from '../src/ui/crucible_spellcaster_mail_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps the crafted Spellcaster mail pieces to their recorded paintings', async () => {
  const note = JSON.parse(readFileSync('docs/whetstorm/crucible-spellcaster-mail-original-generation.json', 'utf8'));
  const ids = ['crucible_caster_mail_chest', 'crucible_caster_mail_waist', 'crucible_caster_mail_feet'];
  expect(CRUCIBLE_COLLECTIONS.find((collection) => collection.id === 'crucible_caster_mail')?.itemIds).toEqual(ids);
  expect(note.images.map((image: { id: string }) => image.id)).toEqual(ids);
  const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
  expect(new Set(note.images.map((image: { outputSha256: string }) => image.outputSha256)).size).toBe(3);
  for (const image of note.images) {
    expect(crucibleSpellcasterMailItemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(itemImageUrl(image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(iconDataUrl('item', image.id)).toBe(`/ui/whetstorm/items/${image.id}.webp`);
    expect(hash(readFileSync(image.master))).toBe(image.masterSha256);
    const output = readFileSync(image.output);
    expect(hash(output)).toBe(image.outputSha256);
    expect(await sharp(output).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  }
  expect(crucibleSpellcasterMailItemImageUrl('unknown')).toBeNull();
});
