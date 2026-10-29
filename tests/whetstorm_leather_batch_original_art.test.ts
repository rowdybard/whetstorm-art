import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { leatherBatchOriginalItemImageUrl } from '../src/ui/leather_batch_original_item_art';

const ids = ['hollowbound_legguards', 'bramblehide_jerkin', 'wayfarers_hood', 'sturdy_belt'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original leather armor batch', () => {
  it('maps the intended live leather items', () => {
    for (const id of ids) {
      expect(ITEMS[id].armorType).toBe('leather');
      expect(leatherBatchOriginalItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(leatherBatchOriginalItemImageUrl('../sturdy_belt')).toBeNull();
  });
  it('pins unique decodable artwork and reference lineage', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/leather-batch-original-generation.json', 'utf8'),
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
