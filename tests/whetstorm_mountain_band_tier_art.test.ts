import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { HOARD_BOSS_LOOT_TABLES, hoardLootVariantId } from '../src/sim/content/hoard_loot';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { mountainBandTierItemImageUrl } from '../src/ui/mountain_band_tier_item_art';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';

const ids = ['rare_band_mountains_weight', 'legendary_band_mountains_weight'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the live hoard variants to their own paintings', () => {
  expect(HOARD_BOSS_LOOT_TABLES.rift_boss_brute).toContain('band_mountains_weight');
  expect(hoardLootVariantId('band_mountains_weight', 'rare')).toBe(ids[0]);
  expect(hoardLootVariantId('band_mountains_weight', 'legendary')).toBe(ids[1]);
  expect(ITEMS[ids[0]]).toMatchObject({ slot: 'ring', quality: 'rare' });
  expect(ITEMS[ids[1]]).toMatchObject({ slot: 'ring', quality: 'epic' });
  for (const id of ids) {
    expect(mountainBandTierItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    expect(paintedItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    expect(iconDataUrl('item', id, 28)).toBe(`/ui/whetstorm/items/${id}.webp`);
  }
  expect(mountainBandTierItemImageUrl('__proto__')).toBeNull();
  expect(mountainBandTierItemImageUrl('band_mountains_weight')).toBeNull();
});

it('pins distinct opaque generated masters and shipping images', async () => {
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/mountain-band-tier-generation.json', 'utf8'));
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
