import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { jewelryBatchNextItemImageUrl } from '../src/ui/jewelry_batch_next_item_art';

const ids = ['mother_of_pearl', 'tidewatchers_locket', 'order_prayer_beads', 'rift_watchers_band'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('jewelry batch paintings', () => {
  it('maps the intended live jewelry and rejects unknown IDs', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('armor');
      expect(['ring', 'neck']).toContain(ITEMS[id]?.slot);
      expect(jewelryBatchNextItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(jewelryBatchNextItemImageUrl('../mother_of_pearl')).toBeNull();
  });
  it('pins unique decoded originals and delivery copies to provenance', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/jewelry-batch-next-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const originals = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const master = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBe(master.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
      expect(readFileSync(asset.delivery.path).length).toBeLessThanOrEqual(15 * 1024);
      originals.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(originals.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
