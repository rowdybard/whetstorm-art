import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { armorBatchTwoItemImageUrl } from '../src/ui/armor_batch_two_item_art';

const ids = ['milepost_boots', 'greyjaw_pelt_cloak', 'oiled_boots', 'quilted_trousers'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('second armor batch item art', () => {
  it('maps only the four item IDs to distinct local images', () => {
    const urls = ids.map(armorBatchTwoItemImageUrl);
    expect(urls).toEqual(ids.map((id) => `/ui/whetstorm/items/${id}.webp`));
    expect(new Set(urls).size).toBe(ids.length);
    expect(armorBatchTwoItemImageUrl('../milepost_boots')).toBeNull();
    expect(armorBatchTwoItemImageUrl('unknown')).toBeNull();
  });

  it('pins distinct decoded paintings and delivery images to their provenance', async () => {
    const manifest = JSON.parse(readFileSync('docs/whetstorm/armor-batch-two-generation.json', 'utf8'));
    expect(manifest.assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of manifest.assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(hash(asset.reference_images[0].path)).toBe(asset.reference_images[0].sha256);
      const master = await sharp(asset.file).raw().toBuffer({ resolveWithObject: true });
      const delivery = await sharp(asset.delivery.path).raw().toBuffer({ resolveWithObject: true });
      expect([master.info.width, master.info.height]).toEqual(asset.pixels);
      expect([delivery.info.width, delivery.info.height]).toEqual([128, 128]);
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
