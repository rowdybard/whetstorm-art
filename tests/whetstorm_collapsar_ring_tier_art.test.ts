import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { hoardLootVariantId } from '../src/sim/content/hoard_loot';
import { ITEMS } from '../src/sim/data';
import { collapsarRingTierItemImageUrl } from '../src/ui/collapsar_ring_tier_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const root = resolve(import.meta.dirname, '..');
const ids = ['rare_collapsar_band_of_nyxaris', 'legendary_collapsar_band_of_nyxaris'];
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

it('maps the live map tiers and rejects unrelated IDs', () => {
  expect(hoardLootVariantId('collapsar_band_of_nyxaris', 'rare')).toBe(ids[0]);
  expect(hoardLootVariantId('collapsar_band_of_nyxaris', 'legendary')).toBe(ids[1]);
  expect(ITEMS[ids[0]]).toMatchObject({ slot: 'ring', quality: 'rare' });
  expect(ITEMS[ids[1]]).toMatchObject({ slot: 'ring', quality: 'epic' });
  for (const id of ids) {
    expect(collapsarRingTierItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
  }
  for (const id of ['collapsar_band_of_nyxaris', 'constructor', '__proto__', 'unknown']) {
    expect(collapsarRingTierItemImageUrl(id)).toBeNull();
  }
});

it('pins unique opaque masters, provenance, and shipping images', async () => {
  const manifest = JSON.parse(
    readFileSync(resolve(root, 'docs/whetstorm/collapsar-ring-tier-generation.json'), 'utf8'),
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
    expect(asset.source).toBe('OpenAI built-in image generation');
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
