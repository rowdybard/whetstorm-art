import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { mountReinsHeroicItemImageUrl } from '../src/ui/mount_reins_heroic_item_art';

it('maps collectible reins to their independently pinned paintings', async () => {
  const ids = ['reins_grag_bear', 'reins_stalkglider_snail', 'reins_shadowjump_toad'];
  const { assets } = JSON.parse(
    readFileSync('docs/whetstorm/mount-reins-heroic-generation.json', 'utf8'),
  );
  expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  for (const asset of assets) {
    expect(ITEMS[asset.itemId]?.kind).toBe('mount');
    expect(mountReinsHeroicItemImageUrl(asset.itemId)).toBe(
      `/ui/whetstorm/items/${asset.itemId}.webp`,
    );
    expect(mountReinsHeroicItemImageUrl(`../${asset.itemId}`)).toBeNull();
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
