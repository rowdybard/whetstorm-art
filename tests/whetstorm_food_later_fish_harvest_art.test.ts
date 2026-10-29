import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { foodLaterFishHarvestItemImageUrl } from '../src/ui/food_later_fish_harvest_item_art';

const ids = [
  'peppered_deepbarb_catfish',
  'roast_hollowgill_sturgeon',
  'evergarden_sunmelon_tart',
  'evergarden_harvest_platter',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('later cooking food paintings', () => {
  it('maps only the intended live food items', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('food');
      expect(foodLaterFishHarvestItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(foodLaterFishHarvestItemImageUrl('../peppered_deepbarb_catfish')).toBeNull();
  });
  it('pins unique decodable source and delivery images', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/food-later-fish-harvest-generation.json', 'utf8'),
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
