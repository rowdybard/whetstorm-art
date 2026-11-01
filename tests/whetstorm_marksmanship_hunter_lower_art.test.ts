import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { marksmanshipHunterLowerItemImageUrl } from '../src/ui/marksmanship_hunter_lower_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = ['vanguard_hunter_marksmanship_legs', 'vanguard_hunter_marksmanship_gloves'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Farsight lower armor paintings', () => {
  it('maps only the intended live items and their slots', () => {
    for (const [index, id] of ids.entries()) {
      expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'leather', slot: ['legs', 'gloves'][index] });
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(marksmanshipHunterLowerItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id, 28)).toBe(url);
    }
    expect(marksmanshipHunterLowerItemImageUrl('vanguard_hunter_marksmanship_chest')).toBeNull();
    expect(marksmanshipHunterLowerItemImageUrl('../vanguard_hunter_marksmanship_legs')).toBeNull();
  });

  it('pins unique decodable masters and delivery artwork', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/marksmanship-hunter-lower-generation.json', 'utf8'));
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
