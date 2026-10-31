import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { furyforgedS1ItemImageUrl } from '../src/ui/furyforged_s1_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps the Furyforged mail slots to distinct original paintings', async () => {
  const ids = ['furyforged_warhelm', 'furyforged_warspaulders', 'furyforged_warplate'];
  const { records } = JSON.parse(
    readFileSync('docs/design/whetstorm-art/items/furyforged-s1-original/provenance.json', 'utf8'),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const record of records) {
    expect(ITEMS[record.id]).toBeDefined();
    expect(furyforgedS1ItemImageUrl(record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
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
  expect(furyforgedS1ItemImageUrl('unknown')).toBeNull();
});
