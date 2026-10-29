import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('Barksong Handguards painting', () => {
  it('routes the live leather glove item to its original image', () => {
    const id = 'barksong_handguards';
    const url = '/ui/whetstorm/items/barksong_handguards.webp';
    expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'leather', slot: 'gloves' });
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
  });
  it('pins the master and optimized delivery to the generation record', async () => {
    const {
      assets: [asset],
    } = JSON.parse(readFileSync('docs/whetstorm/barksong-handguards-generation.json', 'utf8'));
    const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
    expect(asset.itemId).toBe('barksong_handguards');
    expect(asset.reference_images).toEqual([]);
    expect(asset.prompt.length).toBeGreaterThan(50);
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
      width: 128,
      height: 128,
      format: 'webp',
    });
  });
});
