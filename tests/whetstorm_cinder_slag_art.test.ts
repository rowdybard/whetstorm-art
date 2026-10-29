import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { cinderSlagItemImageUrl } from '../src/ui/cinder_slag_item_art';

it('maps distinct live weapons to their original, decodable paintings', async () => {
  const ids = ['cinderfang_kris', 'slagrender_cleaver'];
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/weapon-cinder-slag-generation.json', 'utf8'));
  expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  const hashes = new Set<string>();
  for (const asset of assets) {
    expect(ITEMS[asset.itemId]?.kind).toBe('weapon');
    expect(cinderSlagItemImageUrl(asset.itemId)).toBe(`/ui/whetstorm/items/${asset.itemId}.webp`);
    for (const [path, hash] of [[asset.file, asset.sha256], [asset.delivery.path, asset.delivery.sha256]]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
    }
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
    expect(readFileSync(asset.delivery.path).length).toBeLessThanOrEqual(15 * 1024);
    hashes.add(asset.delivery.sha256);
  }
  expect(hashes.size).toBe(ids.length);
  expect(cinderSlagItemImageUrl('../cinderfang_kris')).toBeNull();
});
