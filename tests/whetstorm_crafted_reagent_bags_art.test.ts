import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { craftedReagentBagsItemImageUrl } from '../src/ui/crafted_reagent_bags_item_art';

const ids = ['burlap_reagent_pouch','foragers_haversack','loombound_reagent_satchel','sunspun_haversack'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('crafted and reagent bag paintings', () => {
  it('maps live items and rejects arbitrary paths', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(craftedReagentBagsItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(craftedReagentBagsItemImageUrl('../burlap_reagent_pouch')).toBeNull();
  });
  it('pins distinct decodable paintings and deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/crafted-reagent-bags-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const source = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
