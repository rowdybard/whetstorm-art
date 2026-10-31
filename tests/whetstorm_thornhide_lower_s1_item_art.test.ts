import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { thornhideLowerS1ItemImageUrl } from '../src/ui/thornhide_lower_s1_item_art';

it('maps Thornhide lower leather slots to distinct original paintings', async () => {
  const ids = ['thornhide_cinch', 'thornhide_leggings', 'thornhide_gloves', 'thornhide_boots'];
  const slots = ['waist', 'legs', 'gloves', 'feet'];
  const { records } = JSON.parse(
    readFileSync(
      'docs/design/whetstorm-art/items/thornhide-lower-original/thornhide-lower-provenance.json',
      'utf8',
    ),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const [index, record] of records.entries()) {
    expect(ITEMS[record.id]).toMatchObject({
      kind: 'armor',
      armorType: 'leather',
      slot: slots[index],
    });
    expect(thornhideLowerS1ItemImageUrl(record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
    expect(itemImageUrl(record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
    expect(iconDataUrl('item', record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
    expect(record.referenceImages).toEqual([]);
    for (const [path, hash] of [
      [record.master, record.masterSha256],
      [record.shipping, record.shippingSha256],
    ]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
    }
    const image = sharp(record.shipping);
    expect(await image.metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
    await image.raw().toBuffer();
    hashes.add(record.shippingSha256);
  }
  expect(hashes.size).toBe(ids.length);
  expect(thornhideLowerS1ItemImageUrl('unknown')).toBeNull();
});
