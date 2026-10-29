import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { earlyMaterialFifteenItemImageUrl } from '../src/ui/early_material_fifteen_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = ['fine_copper_ore', 'fine_ironbark_log', 'fine_silverleaf_herb', 'withered_husks'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('early profession material paintings', () => {
  it('maps the intended live items only', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(earlyMaterialFifteenItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(earlyMaterialFifteenItemImageUrl('../fine_copper_ore')).toBeNull();
  });
  it('pins unique decodable sources, deliveries and reference', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/early-material-fifteen-generation.json', 'utf8'),
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
