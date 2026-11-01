import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { thistlebloomUpperItemImageUrl } from '../src/ui/thistlebloom_upper_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';

const ids = ['vanguard_druid_restoration_helmet', 'vanguard_druid_restoration_shoulder', 'vanguard_druid_restoration_chest'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the live Season 2 Thistlebloom upper set to original art', () => {
  for (const [index, id] of ids.entries()) {
    expect(ITEMS[id]).toMatchObject({ set: 'vanguard_druid_restoration', slot: ['helmet', 'shoulder', 'chest'][index], armorType: 'leather', quality: 'epic' });
    const path = `/ui/whetstorm/items/${id}.webp`;
    expect(thistlebloomUpperItemImageUrl(id)).toBe(path);
    expect(paintedItemImageUrl(id)).toBe(path);
    expect(itemImageUrl(id)).toBe(path);
    expect(iconDataUrl('item', id, 28)).toBe(path);
  }
  expect(thistlebloomUpperItemImageUrl('__proto__')).toBeNull();
  expect(thistlebloomUpperItemImageUrl('vanguard_druid_restoration_legs')).toBeNull();
});

it('pins distinct opaque masters and shipping images', async () => {
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/thistlebloom-upper-generation.json', 'utf8'));
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
