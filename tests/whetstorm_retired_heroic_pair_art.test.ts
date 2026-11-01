import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { RETIRED_HEROIC_ITEMS } from '../src/sim/content/heroic_loot';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';
import { retiredHeroicPairItemImageUrl } from '../src/ui/retired_heroic_pair_item_art';

const ids = ['deathless_warguard_legmail', 'soulrend_diadem'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the retained heroic definitions to their paintings', () => {
  expect(RETIRED_HEROIC_ITEMS[ids[0]]).toMatchObject({ kind: 'armor', armorType: 'mail', slot: 'legs', quality: 'epic' });
  expect(RETIRED_HEROIC_ITEMS[ids[1]]).toMatchObject({ kind: 'armor', armorType: 'cloth', slot: 'helmet', quality: 'epic' });
  for (const id of ids) {
    expect(ITEMS[id]).toBeDefined();
    const path = `/ui/whetstorm/items/${id}.webp`;
    expect(retiredHeroicPairItemImageUrl(id)).toBe(path);
    expect(paintedItemImageUrl(id)).toBe(path);
    expect(itemImageUrl(id)).toBe(path);
    expect(iconDataUrl('item', id, 28)).toBe(path);
  }
  expect(retiredHeroicPairItemImageUrl('__proto__')).toBeNull();
  expect(retiredHeroicPairItemImageUrl('unknown')).toBeNull();
});

it('pins distinct opaque masters and shipping images', async () => {
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/retired-heroic-pair-generation.json', 'utf8'));
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
