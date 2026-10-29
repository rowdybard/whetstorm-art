import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { jewelryForgeItemImageUrl } from '../src/ui/jewelry_forge_item_art';

it('maps four distinct live jewelry paintings to their verified image files', async () => {
  const provenance = JSON.parse(
    readFileSync('docs/whetstorm/jewelry-forge-generation.json', 'utf8'),
  );
  const hashes = new Set<string>();
  for (const asset of provenance.assets) {
    expect(['ring', 'neck']).toContain(ITEMS[asset.itemId]?.slot);
    expect(jewelryForgeItemImageUrl(asset.itemId)).toBe(
      `/${asset.delivery.path.replace(/^public\//, '')}`,
    );
    for (const entry of [asset, asset.delivery]) {
      const file = readFileSync(entry.file ?? entry.path);
      const hash = createHash('sha256').update(file).digest('hex');
      expect(hash).toBe(entry.sha256);
      const metadata = await sharp(file).metadata();
      expect([metadata.width, metadata.height]).toEqual(entry.pixels);
      hashes.add(hash);
    }
  }
  expect(provenance.assets).toHaveLength(4);
  expect(hashes.size).toBe(8);
  expect(jewelryForgeItemImageUrl('not_a_jewel')).toBeNull();
});
