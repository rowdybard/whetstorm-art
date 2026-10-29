import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { jewelryBatchLaterTierItemImageUrl } from '../src/ui/jewelry_batch_later_tier_item_art';

const ids = [
  'seal_of_the_nine_oaths',
  'nielas_coldlight_band',
  'sutils_gambit',
  'oath_of_the_round_table',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('later-tier jewelry paintings', () => {
  it('maps only the intended live rings', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.slot).toBe('ring');
      expect(jewelryBatchLaterTierItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(jewelryBatchLaterTierItemImageUrl('../seal_of_the_nine_oaths')).toBeNull();
  });
  it('pins distinct decodable paintings and provenance', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/jewelry-batch-later-tier-generation.json', 'utf8'),
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
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
      expect(readFileSync(asset.delivery.path).length).toBeLessThanOrEqual(15 * 1024);
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
