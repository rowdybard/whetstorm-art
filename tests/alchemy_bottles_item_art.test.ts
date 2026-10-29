import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { alchemyBottlesItemImageUrl } from '../src/ui/alchemy_bottles_item_art';

it('maps four distinct paintings to decodable 128px images with recorded hashes', async () => {
  const manifest = JSON.parse(
    readFileSync('docs/whetstorm/alchemy-bottles-generation.json', 'utf8'),
  );
  expect(manifest.assets).toHaveLength(4);
  const hashes = new Set<string>();
  for (const asset of manifest.assets) {
    expect(alchemyBottlesItemImageUrl(asset.itemId)).toBe(
      `/${asset.delivery.path.replace(/^public\//, '')}`,
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
  expect(hashes.size).toBe(4);
  expect(alchemyBottlesItemImageUrl('unknown')).toBeNull();
});
