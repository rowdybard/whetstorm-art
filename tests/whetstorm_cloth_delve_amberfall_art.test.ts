import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { clothDelveAmberfallItemImageUrl } from '../src/ui/cloth_delve_amberfall_item_art';

const ids = [
  'varric_shadow_cowl',
  'sunken_reliquary_hood',
  'orchard_sapbinder_grips',
  'mantle_of_the_meredark',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('early cloth armor paintings', () => {
  it('maps the intended live cloth armor', () => {
    for (const id of ids) {
      expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'cloth' });
      expect(clothDelveAmberfallItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(clothDelveAmberfallItemImageUrl('../varric_shadow_cowl')).toBeNull();
  });

  it('pins distinct decodable paintings and provenance', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/cloth-delve-amberfall-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.reference_images).toEqual([]);
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
