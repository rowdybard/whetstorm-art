import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { mountReinsRemainingItemImageUrl } from '../src/ui/mount_reins_remaining_item_art';

it('maps obtainable mounts to independently pinned paintings', async () => {
  const ids = [
    'reins_valorsteed',
    'reins_avian_strider',
    'reins_lanternback_troll',
    'reins_stormfeather_griffin',
    'reins_thunderstrut_gobbler',
    'reins_aether_hover_cycle',
  ];
  const { assets } = JSON.parse(
    readFileSync('docs/whetstorm/mount-reins-remaining-generation.json', 'utf8'),
  );
  expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  for (const asset of assets) {
    expect(ITEMS[asset.itemId]?.kind).toBe('mount');
    expect(mountReinsRemainingItemImageUrl(asset.itemId)).toBe(
      `/ui/whetstorm/items/${asset.itemId}.webp`,
    );
    expect(mountReinsRemainingItemImageUrl(`../${asset.itemId}`)).toBeNull();
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
