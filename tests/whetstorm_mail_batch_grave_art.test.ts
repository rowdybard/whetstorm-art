import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { mailBatchGraveItemImageUrl } from '../src/ui/mail_batch_grave_item_art';

const ids = [
  'gravewyrm_sabatons',
  'deathlord_legguards',
  'deathlord_warplate',
  'deathlords_dread_visage',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Gravewyrm dungeon armor paintings', () => {
  it('maps only the intended live mail pieces', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.armorType).toBe('mail');
      expect(mailBatchGraveItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(mailBatchGraveItemImageUrl('../gravewyrm_sabatons')).toBeNull();
  });
  it('pins unique, decodable masters and delivery files', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mail-batch-grave-generation.json', 'utf8'),
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
      expect(delivery.hasAlpha).toBe(false);
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
