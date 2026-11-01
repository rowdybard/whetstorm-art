import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { wildfangLowerItemImageUrl } from '../src/ui/wildfang_lower_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const root = resolve(import.meta.dirname, '..');
const ids = ['wildfang_emberhide_gloves', 'wildfang_emberhide_legs'];
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

it('routes the live lower raid set and rejects unrelated IDs', () => {
  for (const [id, slot] of ids.map((id, i) => [id, ['gloves', 'legs'][i]])) {
    expect(ITEMS[id]).toMatchObject({ slot, set: 'wildfang_emberhide', quality: 'epic' });
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(wildfangLowerItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
  }
  for (const id of ['wildfang_emberhide_helmet', 'wildfang_emberhide_chest', 'constructor', '__proto__', 'unknown']) {
    expect(wildfangLowerItemImageUrl(id)).toBeNull();
  }
});

it('pins unique opaque masters, provenance, and shipping images', async () => {
  const manifest = JSON.parse(
    readFileSync(resolve(root, 'docs/whetstorm/wildfang-lower-generation.json'), 'utf8'),
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
