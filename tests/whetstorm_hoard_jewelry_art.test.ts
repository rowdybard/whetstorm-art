import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { HOARD_BOSS_LOOT_TABLES, hoardLootVariantId } from '../src/sim/content/hoard_loot';
import { ITEMS } from '../src/sim/data';
import { hoardJewelryItemImageUrl } from '../src/ui/hoard_jewelry_item_art';

const root = resolve(import.meta.dirname, '..');
const ids = ['collapsar_band_of_nyxaris', 'chained_ember_choker', 'band_mountains_weight'];
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

it('maps the epic hoard jewelry and rejects other IDs', () => {
  expect(HOARD_BOSS_LOOT_TABLES.rift_boss_arcane).toContain(ids[0]);
  expect(HOARD_BOSS_LOOT_TABLES.rift_boss_ember).toContain(ids[1]);
  expect(HOARD_BOSS_LOOT_TABLES.rift_boss_brute).toContain(ids[2]);
  for (const id of ids) {
    expect(['ring', 'neck']).toContain(ITEMS[id]?.slot);
    expect(hoardLootVariantId(id, 'epic')).toBe(id);
    expect(hoardJewelryItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
  }
  for (const id of ['constructor', '__proto__', '../collapsar_band_of_nyxaris', 'unknown']) {
    expect(hoardJewelryItemImageUrl(id)).toBeNull();
  }
});

it('pins distinct opaque masters and shipping images', async () => {
  const manifest = JSON.parse(
    readFileSync(resolve(root, 'docs/whetstorm/hoard-jewelry-generation.json'), 'utf8'),
  );
  expect(manifest.assets).toHaveLength(ids.length);
  const masters = new Set<string>();
  const deliveries = new Set<string>();
  for (const id of ids) {
    const rows = manifest.assets.filter((row: { itemId: string }) => row.itemId === id);
    expect(rows).toHaveLength(1);
    const asset = rows[0];
    const master = readFileSync(resolve(root, asset.file));
    const delivery = readFileSync(resolve(root, asset.delivery.path));
    expect(hash(master)).toBe(asset.sha256);
    expect(hash(delivery)).toBe(asset.delivery.sha256);
    expect(asset.prompt.length).toBeGreaterThan(100);
    const original = await sharp(master).raw().toBuffer({ resolveWithObject: true });
    const image = await sharp(delivery).raw().toBuffer({ resolveWithObject: true });
    expect(original.info.width).toBeGreaterThanOrEqual(512);
    expect(original.info.height).toBe(original.info.width);
    expect(original.info.channels).toBe(3);
    expect(image.info).toMatchObject({ width: 128, height: 128, channels: 3 });
    expect((await sharp(delivery).metadata()).format).toBe('webp');
    expect(delivery.length).toBeLessThan(16_384);
    masters.add(asset.sha256);
    deliveries.add(asset.delivery.sha256);
  }
  expect(masters.size).toBe(ids.length);
  expect(deliveries.size).toBe(ids.length);
});
