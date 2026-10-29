import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { farmingThornpeakItemImageUrl } from '../src/ui/farming_thornpeak_item_art';

const ids = [
  'thornpeak_cabbage_seed',
  'thornpeak_cabbage',
  'fine_thornpeak_cabbage',
  'frost_lentils_seed',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Thornpeak farming material paintings', () => {
  it('maps only the intended live items', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(farmingThornpeakItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(farmingThornpeakItemImageUrl('../thornpeak_cabbage')).toBeNull();
  });
  it('pins unique decodable sources, deliveries and reference', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/farming-thornpeak-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      for (const ref of asset.reference_images) expect(hash(ref.path)).toBe(ref.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const source = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
