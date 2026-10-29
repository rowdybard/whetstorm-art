import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { plateRoadwardItemImageUrl } from '../src/ui/plate_roadward_item_art';

const ids = [
  'roadwardens_helm',
  'reinforced_pauldrons',
  'outrider_brigandine',
  'outrider_legguards',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('roadward mail armor paintings', () => {
  it('maps the intended live mail armor items', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.armorType).toBe('mail');
      expect(plateRoadwardItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(plateRoadwardItemImageUrl('../roadwardens_helm')).toBeNull();
  });
  it('pins unique decodable originals, deliveries, and references', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/plate-roadward-batch-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const originals = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      for (const ref of asset.reference_images) expect(hash(ref.path)).toBe(ref.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const original = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(original.width).toBeGreaterThanOrEqual(512);
      expect(original.height).toBe(original.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      originals.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(originals.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
