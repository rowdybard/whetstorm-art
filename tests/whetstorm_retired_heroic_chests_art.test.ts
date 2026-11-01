import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { RETIRED_HEROIC_ITEMS } from '../src/sim/content/heroic_loot';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { retiredHeroicChestsItemImageUrl } from '../src/ui/retired_heroic_chests_item_art';

const ids = ['scourgehide_carapace', 'soulforged_warplate'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('retired heroic chest paintings', () => {
  it('resolves saved armor through the production icon path', () => {
    for (const [index, id] of ids.entries()) {
      expect(ITEMS[id]).toBe(RETIRED_HEROIC_ITEMS[id]);
      expect(ITEMS[id]).toMatchObject({
        kind: 'armor',
        slot: 'chest',
        armorType: ['leather', 'mail'][index],
      });
      const path = `/ui/whetstorm/items/${id}.webp`;
      expect(retiredHeroicChestsItemImageUrl(id)).toBe(path);
      expect(itemImageUrl(id)).toBe(path);
      expect(iconDataUrl('item', id)).toBe(path);
    }
    expect(retiredHeroicChestsItemImageUrl('../scourgehide_carapace')).toBeNull();
  });

  it('pins distinct decodable masters and deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/retired-heroic-chests-generation.json', 'utf8'),
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
