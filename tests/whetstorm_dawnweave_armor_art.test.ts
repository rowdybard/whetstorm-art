import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { dawnweaveArmorItemImageUrl } from '../src/ui/dawnweave_armor_item_art';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';

const ids = [
  'benison_dawnweave_helmet',
  'benison_dawnweave_shoulder',
  'benison_dawnweave_chest',
  'benison_dawnweave_gloves',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Dawnweave armor paintings', () => {
  it('maps the intended live items only', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(dawnweaveArmorItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(paintedItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(dawnweaveArmorItemImageUrl('../benison_dawnweave_helmet')).toBeNull();
  });
  it('pins distinct opaque masters and deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/dawnweave-armor-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const hashes = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      const master = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBe(master.width);
      expect(master.hasAlpha).toBe(false);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
      expect(readFileSync(asset.delivery.path).length).toBeLessThanOrEqual(15360);
      hashes.add(asset.delivery.sha256);
    }
    expect(hashes.size).toBe(ids.length);
  });
});
