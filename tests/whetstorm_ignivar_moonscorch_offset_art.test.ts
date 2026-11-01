import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { ignivarMoonscorchOffsetItemImageUrl } from '../src/ui/ignivar_moonscorch_offset_item_art';

const ids = ['moonscorch_waistwrap', 'scorchgrove_striders'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Ignivar moonscorch offset paintings', () => {
  it('maps only the intended live items', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(ignivarMoonscorchOffsetItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(ITEMS.moonscorch_waistwrap).toMatchObject({
      kind: 'armor',
      armorType: 'leather',
      slot: 'waist',
    });
    expect(ITEMS.scorchgrove_striders).toMatchObject({
      kind: 'armor',
      armorType: 'leather',
      slot: 'feet',
    });
    expect(ignivarMoonscorchOffsetItemImageUrl('../moonscorch_waistwrap')).toBeNull();
  });

  it('pins unique decodable masters and delivery artwork', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/ignivar-moonscorch-offset-generation.json', 'utf8'),
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
