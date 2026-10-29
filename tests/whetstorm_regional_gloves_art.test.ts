import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = ['shearkeeper_gloves', 'saltforged_grips', 'gravebound_silk_wraps'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
describe('regional cloth glove paintings', () => {
  it('routes each live cloth reward to its own painting', () => {
    for (const id of ids) {
      expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'cloth', slot: 'gloves' });
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('records distinct source and delivery images with correct hashes', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/regional-gloves-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(3);
    for (const asset of assets) {
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
    }
  });
});
