import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'greyjaw_fang',
  'webwood_silk',
  'supply_crate',
  'bandit_bandana',
  'milepost_boots',
  'greyjaw_pelt_cloak',
  'oiled_boots',
  'quilted_trousers',
];
const hash = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex');

describe('early quest material and armor paintings', () => {
  it('routes the next armor and tool paintings through both image APIs', () => {
    for (const id of [
      'greyjaw_hide_boots',
      'sableweb_slippers',
      'moggers_stomper_boots',
      'cryptbone_helm',
      'field_kit',
      'handaxe',
      'iron_mining_pick',
      'bronze_sickle',
    ]) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes the eight live item IDs through both image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });

  it('preserves unique source and delivery images with matching references', async () => {
    const manifests = [
      'early-quest-material-art-generation.json',
      'armor-batch-two-generation.json',
    ];
    const assets = manifests.flatMap(
      (name) => JSON.parse(readFileSync(`docs/whetstorm/${name}`, 'utf8')).assets,
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId).sort()).toEqual([...ids].sort());
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      for (const reference of asset.reference_images)
        expect(hash(reference.path)).toBe(reference.sha256);
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
