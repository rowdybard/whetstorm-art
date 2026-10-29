import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const expected: [string, string][] = [
  ['cinderwalk_treads', 'feet'],
  ['hearthlined_treads', 'feet'],
  ['moonfleece_mitts', 'gloves'],
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
describe('regional cloth quest reward paintings', () => {
  it('routes each live cloth reward to its own painting', () => {
    for (const [id, slot] of expected) {
      expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'cloth', slot });
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('records distinct sources and delivery images with correct hashes', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/regional-cloth-rewards-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(
      expected.map(([id]) => id),
    );
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(3);
    for (const asset of assets) {
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
    }
  });
});
