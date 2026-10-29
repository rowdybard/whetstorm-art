import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { mailDungeonOriginalItemImageUrl } from '../src/ui/mail_dungeon_original_item_art';

const ids = [
  'sister_nhalia_choir_plate',
  'skullsmasher_warbelt',
  'emberwing_legguards',
  'gravewyrm_scale_hauberk',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
describe('dungeon mail paintings', () => {
  it('maps only the intended live mail items', () => {
    for (const id of ids) {
      expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'mail' });
      expect(mailDungeonOriginalItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(mailDungeonOriginalItemImageUrl('../skullsmasher_warbelt')).toBeNull();
  });
  it('pins unique decodable masters, delivery files, and provenance', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mail-dungeon-original-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const original = await sharp(asset.file).metadata();
      expect(original.width).toBeGreaterThanOrEqual(512);
      expect(original.height).toBe(original.width);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
        hasAlpha: false,
      });
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
