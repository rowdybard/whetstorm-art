import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { FACTION_VENDOR_GATES, FACTION_VENDOR_STOCK } from '../src/sim/content/faction_vendors';
import { ITEMS } from '../src/sim/data';
import { churchClothOriginalItemImageUrl } from '../src/ui/church_cloth_original_item_art';

const ids = ['vestments_of_the_acolyte', 'cord_of_the_dawn', 'dawnlit_slippers'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Church Order cloth paintings', () => {
  it('maps obtainable live cloth armor only', () => {
    for (const id of ids) {
      expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'cloth' });
      expect(FACTION_VENDOR_GATES[id]).toMatchObject({
        factionId: 'church_order',
        standingTier: 'proven',
      });
      expect(FACTION_VENDOR_STOCK.church_order).toContain(id);
      expect(churchClothOriginalItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(churchClothOriginalItemImageUrl('../cord_of_the_dawn')).toBeNull();
  });
  it('pins distinct decoded originals, deliveries, and style references', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/church-cloth-original-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      for (const ref of asset.reference_images) expect(hash(ref.path)).toBe(ref.sha256);
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
