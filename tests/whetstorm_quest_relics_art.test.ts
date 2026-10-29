import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { questRelicsItemImageUrl } from '../src/ui/quest_relics_item_art';

const ids = ['crypt_keystone', 'moongate_rubbing', 'drowned_offering', 'hedgewick_shears'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('quest relic paintings', () => {
  it('maps only the intended item IDs', () => {
    for (const id of ids)
      expect(questRelicsItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    expect(questRelicsItemImageUrl('../crypt_keystone')).toBeNull();
  });
  it('pins unique, decodable masters and delivery files', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/quest-batch-relics-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const master = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBe(master.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
