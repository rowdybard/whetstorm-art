import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { earlyDropsItemImageUrl } from '../src/ui/early_drops_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const root = resolve(import.meta.dirname, '..');
const ids = ['wolf_fang', 'boar_hide', 'tough_jerky', 'spider_leg'];
const parallelIds = [
  'trail_leggings',
  'mosshide_vest',
  'acolyte_chain_grips',
  'mossy_handwraps',
  'copper_mining_pick',
  'garden_hoe',
  'simple_fishing_pole',
  'gathering_sickle',
];
const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('original early creature drop paintings', () => {
  it('routes each existing item through both item image APIs', () => {
    for (const id of ids) {
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(Object.hasOwn(ITEMS, id), id).toBe(true);
      expect(earlyDropsItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
    }
    for (const id of ['constructor', '__proto__', '../wolf_fang', 'unknown']) {
      expect(earlyDropsItemImageUrl(id)).toBeNull();
      expect(itemImageUrl(id)).toBeNull();
    }
  });

  it('routes the independent armor and tool batches through the same public APIs', () => {
    for (const id of parallelIds) {
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(Object.hasOwn(ITEMS, id), id).toBe(true);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
    }
  });

  it('preserves the source, reference and distinct delivery bytes', async () => {
    const manifest = JSON.parse(
      readFileSync(resolve(root, 'docs/whetstorm/early-drop-item-art-generation.json'), 'utf8'),
    );
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const id of ids) {
      const rows = manifest.assets.filter((row: { itemId: string }) => row.itemId === id);
      expect(rows).toHaveLength(1);
      const asset = rows[0];
      const master = readFileSync(resolve(root, asset.file));
      const delivery = readFileSync(resolve(root, asset.delivery.path));
      const reference = readFileSync(resolve(root, asset.reference_images[0].path));
      expect(sha256(master)).toBe(asset.sha256);
      expect(sha256(delivery)).toBe(asset.delivery.sha256);
      expect(sha256(reference)).toBe(asset.reference_images[0].sha256);
      expect(asset.prompt).toContain('Subject:');
      const original = await sharp(master).metadata();
      const image = await sharp(delivery).metadata();
      expect(original.width).toBeGreaterThanOrEqual(512);
      expect(original.height).toBe(original.width);
      expect(original.hasAlpha).toBe(false);
      expect(image).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
      expect(delivery.length).toBeLessThan(16_384);
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
