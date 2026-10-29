import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { evergardenSeedsItemImageUrl } from '../src/ui/evergarden_seeds_item_art';

it('maps farming seeds to their independently pinned paintings', async () => {
  const ids = [
    'gilded_sunmelon_seed',
    'evergarden_greens_seed',
    'gilded_yam_seed',
    'evergarden_pumpkin_seed',
  ];
  const { assets } = JSON.parse(
    readFileSync('docs/whetstorm/evergarden-seeds-generation.json', 'utf8'),
  );
  expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  for (const asset of assets) {
    expect(ITEMS[asset.itemId]).toBeDefined();
    expect(evergardenSeedsItemImageUrl(asset.itemId)).toBe(
      `/ui/whetstorm/items/${asset.itemId}.webp`,
    );
    expect(evergardenSeedsItemImageUrl(`../${asset.itemId}`)).toBeNull();
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
