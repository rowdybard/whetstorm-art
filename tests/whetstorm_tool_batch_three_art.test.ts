import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { toolBatchThreeItemImageUrl } from '../src/ui/tool_batch_three_item_art';

const root = resolve(import.meta.dirname, '..');
const ids = ['field_kit', 'handaxe', 'iron_mining_pick', 'bronze_sickle'];
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('original gathering tool paintings', () => {
  it('maps each existing tool to its own image and rejects unknown IDs', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('tool');
      expect(toolBatchThreeItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    for (const id of ['constructor', '__proto__', '../field_kit', 'unknown']) {
      expect(toolBatchThreeItemImageUrl(id)).toBeNull();
    }
  });

  it('pins distinct, decodable masters, references and delivery images', async () => {
    const manifest = JSON.parse(
      readFileSync(resolve(root, 'docs/whetstorm/tool-batch-three-generation.json'), 'utf8'),
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
      const reference = readFileSync(resolve(root, asset.reference_images[0].path));
      expect(hash(master)).toBe(asset.sha256);
      expect(hash(delivery)).toBe(asset.delivery.sha256);
      expect(hash(reference)).toBe(asset.reference_images[0].sha256);
      expect(asset.prompt.length).toBeGreaterThan(100);
      const sourceImage = await sharp(master).raw().toBuffer({ resolveWithObject: true });
      const image = await sharp(delivery).raw().toBuffer({ resolveWithObject: true });
      expect(sourceImage.info.width).toBeGreaterThanOrEqual(512);
      expect(sourceImage.info.height).toBe(sourceImage.info.width);
      expect(sourceImage.info.channels).toBe(3);
      expect(image.info).toMatchObject({ width: 128, height: 128, channels: 3 });
      expect((await sharp(delivery).metadata()).format).toBe('webp');
      expect(delivery.length).toBeLessThan(16_384);
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
