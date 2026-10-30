import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { HOARD_BOSS_LOOT_TABLES } from '../src/sim/content/hoard_loot';
import { ITEMS } from '../src/sim/data';
import { hoardJewelrySecondItemImageUrl } from '../src/ui/hoard_jewelry_second_item_art';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';

const ids = ['seal_of_the_cryptwalker', 'pendant_continuous_flow'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('maps the intended live hoard jewelry and rejects arbitrary IDs', () => {
  const loot = Object.values(HOARD_BOSS_LOOT_TABLES).flat();
  for (const id of ids) {
    expect(loot).toContain(id);
    expect(['ring', 'neck']).toContain(ITEMS[id]?.slot);
    expect(hoardJewelrySecondItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    expect(paintedItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
  }
  expect(hoardJewelrySecondItemImageUrl('../seal_of_the_cryptwalker')).toBeNull();
  expect(hoardJewelrySecondItemImageUrl('__proto__')).toBeNull();
});

it('pins distinct opaque masters and shipping images', async () => {
  const { assets } = JSON.parse(
    readFileSync('docs/whetstorm/hoard-jewelry-second-generation.json', 'utf8'),
  );
  expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  const masters = new Set<string>();
  const deliveries = new Set<string>();
  for (const asset of assets) {
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    expect(asset.prompt.length).toBeGreaterThan(100);
    const master = await sharp(asset.file).metadata();
    const delivery = await sharp(asset.delivery.path).metadata();
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.height).toBe(master.width);
    expect(master.hasAlpha).toBe(false);
    expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
    expect(readFileSync(asset.delivery.path).length).toBeLessThan(16384);
    masters.add(asset.sha256);
    deliveries.add(asset.delivery.sha256);
  }
  expect(masters.size).toBe(ids.length);
  expect(deliveries.size).toBe(ids.length);
});
