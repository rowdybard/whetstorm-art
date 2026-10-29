import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { fineProduceStockItemImageUrl } from '../src/ui/fine_produce_stock_item_art';

it('maps fine produce and stock to their independently pinned paintings', async () => {
  const ids = ['fine_gilded_sunmelon', 'fine_evergarden_greens', 'seasoned_stock'];
  const { assets } = JSON.parse(
    readFileSync('docs/whetstorm/fine-produce-stock-generation.json', 'utf8'),
  );
  expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  for (const asset of assets) {
    expect(ITEMS[asset.itemId]).toBeDefined();
    expect(fineProduceStockItemImageUrl(asset.itemId)).toBe(
      `/ui/whetstorm/items/${asset.itemId}.webp`,
    );
    expect(fineProduceStockItemImageUrl(`../${asset.itemId}`)).toBeNull();
    for (const [path, hash] of [
      [asset.file, asset.sha256],
      [asset.delivery.path, asset.delivery.sha256],
    ]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
      await sharp(path).raw().toBuffer();
    }
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
      width: 128,
      height: 128,
      format: 'webp',
    });
  }
});
