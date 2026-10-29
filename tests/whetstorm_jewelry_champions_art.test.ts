import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { jewelryChampionsItemImageUrl } from '../src/ui/jewelry_champions_item_art';

const ids = [
  'champion_rift_band',
  'riftwardens_pendant',
  'champion_dawn_medallion',
  'champions_dawn_loop',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('champion faction jewelry paintings', () => {
  it('maps only the intended live items', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(jewelryChampionsItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(jewelryChampionsItemImageUrl('../champion_rift_band')).toBeNull();
  });
  it('pins unique decodable source and runtime images', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/jewelry-champions-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const original = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(original.width).toBeGreaterThanOrEqual(512);
      expect(original.height).toBe(original.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
