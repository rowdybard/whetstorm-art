import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { questShoreOriginalItemImageUrl } from '../src/ui/quest_shore_original_item_art';

const ids = ['ps_castaway_crate', 'ps_passing_stone', 'ps_briny_lure', 'firebottle'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('shore quest paintings', () => {
  it('maps only the intended item IDs', () => {
    for (const id of ids)
      expect(questShoreOriginalItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    expect(questShoreOriginalItemImageUrl('../firebottle')).toBeNull();
  });
  it('pins unique, decodable masters and runtime artwork', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/quest-shore-original-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const hashes = new Set<string>();
    const deliveryHashes = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const master = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBe(master.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      hashes.add(asset.sha256);
      deliveryHashes.add(asset.delivery.sha256);
    }
    expect(hashes.size).toBe(ids.length);
    expect(deliveryHashes.size).toBe(ids.length);
  });
});
