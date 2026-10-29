import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { questFiberDropsItemImageUrl } from '../src/ui/quest_fiber_drops_item_art';

it('maps quest fibers to their independently pinned paintings', async () => {
  const ids = ['moonfleece_tuft', 'widowsilk_skein', 'canopy_silk_hank'];
  const { assets } = JSON.parse(
    readFileSync('docs/whetstorm/quest-fiber-drops-generation.json', 'utf8'),
  );
  expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  for (const asset of assets) {
    expect(ITEMS[asset.itemId]?.kind).toBe('quest');
    expect(questFiberDropsItemImageUrl(asset.itemId)).toBe(
      `/ui/whetstorm/items/${asset.itemId}.webp`,
    );
    expect(questFiberDropsItemImageUrl(`../${asset.itemId}`)).toBeNull();
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
