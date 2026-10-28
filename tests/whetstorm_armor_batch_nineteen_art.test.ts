import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { armorBatchNineteenItemImageUrl } from '../src/ui/armor_batch_nineteen_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = ['bogiron_hauberk', 'marshcloth_robe', 'reedwoven_jerkin', 'reedwoven_trousers'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('nineteenth armor batch paintings', () => {
  it('routes only the intended live items through both APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(armorBatchNineteenItemImageUrl('../reedwoven_trousers')).toBeNull();
  });
  it('pins the unique, decodable artwork and its references', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/armor-batch-nineteen-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      for (const ref of asset.reference_images) expect(hash(ref.path)).toBe(ref.sha256);
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
