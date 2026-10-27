import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'raw_river_perch',
  'soggy_boot',
  'tangled_weed',
  'glimmerfin_koi',
  'homespun_mitts',
  'silverthread_slippers',
  'fenbridge_hide_leggings',
  'fenbridge_hide_belt',
  'gorraks_cleaver',
  'maldrecs_soulbinder',
  'eastbrook_arming_sword',
  'copper_bearded_axe',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('tenth batch of original item paintings', () => {
  it('routes each live item through both image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('pins distinct source, reference and delivery images', async () => {
    const files = [
      'early-material-ten-generation.json',
      'armor-batch-ten-generation.json',
      'weapon-batch-ten-generation.json',
    ];
    const assets = files.flatMap(
      (name) => JSON.parse(readFileSync(`docs/whetstorm/${name}`, 'utf8')).assets,
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId).sort()).toEqual([...ids].sort());
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      for (const ref of asset.reference_images) expect(hash(ref.path)).toBe(ref.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const source = await sharp(asset.file).metadata();
      const image = await sharp(asset.delivery.path).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(image).toMatchObject({ width: 128, height: 128, format: 'webp' });
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
