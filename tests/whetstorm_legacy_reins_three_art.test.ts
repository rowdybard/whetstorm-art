import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { legacyReinsThreeItemImageUrl } from '../src/ui/legacy_reins_three_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = ['reins_mech_bird', 'reins_rallycart_rxt', 'reins_goblin_rocket_sled'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Legacy ignition-key paintings', () => {
  it('maps the intended retained item definitions through the production route', () => {
    for (const id of ids) {
      expect(ITEMS[id]).toMatchObject({ kind: 'junk', soulbound: true });
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(legacyReinsThreeItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id, 28)).toBe(url);
    }
    expect(legacyReinsThreeItemImageUrl('reins_avian_strider')).toBeNull();
    expect(legacyReinsThreeItemImageUrl('../reins_mech_bird')).toBeNull();
  });

  it('pins distinct decodable masters and delivery artwork', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/legacy-reins-three-generation.json', 'utf8'));
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
