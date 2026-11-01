import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { disciplinePriestLowerItemImageUrl } from '../src/ui/discipline_priest_lower_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = ['vanguard_priest_discipline_legs', 'vanguard_priest_discipline_gloves'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Veilpsalm lower armor paintings', () => {
  it('maps only the intended live items and their slots', () => {
    for (const [index, id] of ids.entries()) {
      expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'cloth', slot: ['legs', 'gloves'][index] });
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(disciplinePriestLowerItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id, 28)).toBe(url);
    }
    expect(disciplinePriestLowerItemImageUrl('vanguard_priest_discipline_chest')).toBeNull();
    expect(disciplinePriestLowerItemImageUrl('../vanguard_priest_discipline_legs')).toBeNull();
  });

  it('pins unique decodable masters and delivery artwork', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/discipline-priest-lower-generation.json', 'utf8'));
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
