import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { questTreasureMapItemImageUrl } from '../src/ui/quest_treasure_map_item_art';

const ids = [
  'treasure_map_common',
  'treasure_map_rare',
  'treasure_map_epic',
  'treasure_map_legendary',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Treasure map paintings', () => {
  it('maps the four live carried quest items and rejects arbitrary paths', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('quest');
      expect(ITEMS[id]?.use?.type).toBe('treasureMap');
      expect(questTreasureMapItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(questTreasureMapItemImageUrl('../treasure_map_common')).toBeNull();
  });
  it('pins distinct, decodable masters and delivery images', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/quest-batch-treasure-maps-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const original = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(original.width).toBeGreaterThanOrEqual(512);
      expect(original.height).toBe(original.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
