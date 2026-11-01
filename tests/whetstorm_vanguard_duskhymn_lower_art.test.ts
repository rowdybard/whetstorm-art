import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { vanguardDuskhymnLowerItemImageUrl } from '../src/ui/vanguard_duskhymn_lower_item_art';

const ids = [
  'vanguard_priest_shadow_gloves',
  'vanguard_priest_shadow_legs',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Vanguard Duskhymn lower armor paintings', () => {
  it('resolves the intended live mail pieces through the production icon path', () => {
    for (const [index, id] of ids.entries()) {
      expect(ITEMS[id]).toMatchObject({
        kind: 'armor',
        armorType: 'cloth',
        slot: ['gloves', 'legs'][index],
        set: 'vanguard_priest_shadow',
      });
      const path = `/ui/whetstorm/items/${id}.webp`;
      expect(vanguardDuskhymnLowerItemImageUrl(id)).toBe(path);
      expect(itemImageUrl(id)).toBe(path);
      expect(iconDataUrl('item', id)).toBe(path);
    }
    expect(vanguardDuskhymnLowerItemImageUrl('../vanguard_priest_shadow_gloves')).toBeNull();
  });

  it('pins unique decodable masters and delivery artwork', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/vanguard-duskhymn-lower-generation.json', 'utf8'),
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
