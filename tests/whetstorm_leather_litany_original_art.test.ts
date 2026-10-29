import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { leatherLitanyOriginalItemImageUrl } from '../src/ui/leather_litany_original_item_art';

it('maps distinct live leather armor to intact 128px paintings', async () => {
  const manifest = JSON.parse(
    readFileSync('docs/whetstorm/leather-litany-original-generation.json', 'utf8'),
  );
  const hashes = new Set<string>();
  for (const asset of manifest.assets) {
    expect(ITEMS[asset.itemId]?.armorType).toBe('leather');
    expect(leatherLitanyOriginalItemImageUrl(asset.itemId)).toBe(
      `/${asset.delivery.path.replace('public/', '')}`,
    );
    for (const [path, expected] of [
      [asset.file, asset.sha256],
      [asset.delivery.path, asset.delivery.sha256],
    ]) {
      const bytes = readFileSync(path);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(expected);
    }
    const metadata = await sharp(readFileSync(asset.delivery.path)).metadata();
    expect([metadata.format, metadata.width, metadata.height]).toEqual(['webp', 128, 128]);
    hashes.add(asset.sha256);
  }
  expect(manifest.assets).toHaveLength(4);
  expect(hashes.size).toBe(4);
  expect(leatherLitanyOriginalItemImageUrl('not_an_item')).toBeNull();
});
