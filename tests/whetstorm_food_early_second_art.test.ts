import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { foodEarlySecondItemImageUrl } from '../src/ui/food_early_second_item_art';

const ids = [
  'vale_hearth_loaf',
  'eastbrook_root_pottage',
  'eastbrook_glazed_carrots',
  'fenbridge_rice_bowl',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('early cooking paintings', () => {
  it('maps only intended live food items', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('food');
      expect(foodEarlySecondItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(foodEarlySecondItemImageUrl('../vale_hearth_loaf')).toBeNull();
  });
  it('pins unique fully decodable sources and delivery images', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/food-early-second-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const original = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(original.width).toBeGreaterThanOrEqual(512);
      expect(original.height).toBe(original.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      await sharp(asset.file).raw().toBuffer();
      await sharp(asset.delivery.path).raw().toBuffer();
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
