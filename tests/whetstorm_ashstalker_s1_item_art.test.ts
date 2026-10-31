import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { ashstalkerS1ItemImageUrl } from '../src/ui/ashstalker_s1_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps Ashstalker leather slots to distinct original paintings', async () => {
  const ids = ['ashstalker_cowl', 'ashstalker_shoulderguards', 'ashstalker_harness'];
  const slots = ['helmet', 'shoulder', 'chest'];
  const { records } = JSON.parse(
    readFileSync(
      'docs/design/whetstorm-art/items/ashstalker-s1-original/ashstalker-provenance.json',
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
    expect(ashstalkerS1ItemImageUrl(record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
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
  expect(ashstalkerS1ItemImageUrl('unknown')).toBeNull();
});
