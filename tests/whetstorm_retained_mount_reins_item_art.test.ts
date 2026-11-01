import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { retainedMountReinsItemImageUrl } from '../src/ui/retained_mount_reins_item_art';

const ids = ['reins_terrorspark_groundshaker', 'reins_drakemaw_raptor'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes retained mount items to their own paintings', () => {
  expect(ITEMS[ids[0]]).toMatchObject({ kind: 'mount', mount: 'terrorspark_groundshaker', soulbound: true });
  expect(ITEMS[ids[1]]).toMatchObject({ kind: 'mount', mount: 'drakemaw_raptor' });
  for (const id of ids) {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(retainedMountReinsItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
  }
  expect(retainedMountReinsItemImageUrl('__proto__')).toBeNull();
});

it('pins distinct original masters and 128px shipping images', async () => {
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/retained-mount-reins-generation.json', 'utf8'));
  expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  const masters = new Set<string>();
  const deliveries = new Set<string>();
  for (const asset of assets) {
    expect(asset.source).toBe('OpenAI built-in image generation');
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    const master = await sharp(asset.file).metadata();
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.height).toBe(master.width);
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
    masters.add(asset.sha256);
    deliveries.add(asset.delivery.sha256);
  }
  expect(masters.size).toBe(ids.length);
  expect(deliveries.size).toBe(ids.length);
});
