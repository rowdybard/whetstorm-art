import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { chromaPlateFourItemImageUrl } from '../src/ui/chroma_plate_four_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = ['alien_armor_plate', 'amber_crimson_armor_plate', 'crimson_amber_armor_plate', 'cyan_magenta_armor_plate'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Combat Mech plate paintings', () => {
  it('maps the intended retained item definitions through the production route', () => {
    for (const id of ids) {
      expect(ITEMS[id]).toMatchObject({ kind: 'tool' });
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(chromaPlateFourItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id, 28)).toBe(url);
    }
    expect(chromaPlateFourItemImageUrl('magenta_cyan_armor_plate')).toBeNull();
    expect(chromaPlateFourItemImageUrl('../alien_armor_plate')).toBeNull();
  });

  it('pins distinct decodable masters and delivery artwork', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/chroma-plate-four-generation.json', 'utf8'));
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
