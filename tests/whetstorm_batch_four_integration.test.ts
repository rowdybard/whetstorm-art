import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'mudfin_scale',
  'linen_scrap',
  'tallow_candle',
  'bone_fragments',
  'thornling_grips',
  'votive_chain_belt',
  'oathbound_greaves',
  'gravepath_treads',
  'ironreel_fishing_rod',
  'felling_axe',
  'mithril_mining_pick',
  'silverleaf_sickle',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('fourth batch of original item paintings', () => {
  it('routes each live item through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });

  it('pins each distinct source, reference and delivery image', async () => {
    const files = [
      'early-material-four-generation.json',
      'armor-batch-four-generation.json',
      'tool-batch-four-generation.json',
    ];
    const assets = files.flatMap(
      (name) => JSON.parse(readFileSync(`docs/whetstorm/${name}`, 'utf8')).assets,
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId).sort()).toEqual([...ids].sort());
    const originals = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      for (const ref of asset.reference_images) expect(hash(ref.path)).toBe(ref.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const source = await sharp(asset.file).metadata();
      const image = await sharp(asset.delivery.path).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(image).toMatchObject({ width: 128, height: 128, format: 'webp' });
      originals.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(originals.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
