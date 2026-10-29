import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { HONOR_QUARTERMASTER_STOCK } from '../src/sim/content/pvp_honor';
import { ITEMS } from '../src/sim/data';
import { warfareJewelryItemImageUrl } from '../src/ui/jewelry_batch_warfare_item_art';

const ids = ['final_oath_medallion', 'razorwind_torque', 'cinder_sigil_pendant', 'iron_vow_band'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Warfare jewelry paintings', () => {
  it('maps four obtainable items and rejects arbitrary paths', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(HONOR_QUARTERMASTER_STOCK).toContain(id);
      expect(warfareJewelryItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(warfareJewelryItemImageUrl('../iron_vow_band')).toBeNull();
  });
  it('pins unique decodable masters and deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/jewelry-batch-warfare-generation.json', 'utf8'),
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
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
