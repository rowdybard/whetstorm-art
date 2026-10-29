import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { leatherDelveNextItemImageUrl } from '../src/ui/leather_delve_next_item_art';

it('maps four obtainable leather pieces to distinct, intact paintings', async () => {
  const record = JSON.parse(
    readFileSync('docs/whetstorm/leather-delve-next-generation.json', 'utf8'),
  );
  const ids = [
    'reliquary_leather_chest',
    'reliquary_gloves_rog',
    'reedstalker_jerkin',
    'widow_silk_hood',
  ];
  expect(record.assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  const hashes = new Set<string>();
  for (const asset of record.assets) {
    expect(ITEMS[asset.itemId]?.armorType).toBe('leather');
    expect(leatherDelveNextItemImageUrl(asset.itemId)).toBe(
      `/${asset.delivery.path.replace('public/', '')}`,
    );
    for (const [path, expected] of [
      [asset.file, asset.sha256],
      [asset.delivery.path, asset.delivery.sha256],
    ]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(expected);
    }
    const meta = await sharp(asset.delivery.path).metadata();
    expect([meta.format, meta.width, meta.height]).toEqual(['webp', 128, 128]);
    hashes.add(asset.delivery.sha256);
  }
  expect(hashes.size).toBe(ids.length);
  expect(leatherDelveNextItemImageUrl('unknown')).toBeNull();
});
