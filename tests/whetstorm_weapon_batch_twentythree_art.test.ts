import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { weaponBatchTwentythreeItemImageUrl } from '../src/ui/weapon_batch_twentythree_item_art';

const ids = ['ironvein_lantern_staff', 'emberfang_warblade', 'brutoks_maul', 'crag_warden_cudgel'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('twenty-third weapon batch paintings', () => {
  it('maps only intended live weapons', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('weapon');
      expect(weaponBatchTwentythreeItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(weaponBatchTwentythreeItemImageUrl('../brutoks_maul')).toBeNull();
  });
  it('pins distinct decodable paintings and their provenance', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/weapon-batch-twentythree-generation.json', 'utf8'),
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
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
      expect(readFileSync(asset.delivery.path).length).toBeLessThanOrEqual(15 * 1024);
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
