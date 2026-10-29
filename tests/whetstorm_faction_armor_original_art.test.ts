import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { FACTION_VENDOR_GATES } from '../src/sim/content/faction_vendors';
import { ITEMS } from '../src/sim/data';
import { factionArmorOriginalItemImageUrl } from '../src/ui/faction_armor_original_item_art';

const ids = [
  'riftwalkers_tunic',
  'riftwalkers_cord',
  'riftwalkers_treads',
  'artificers_welding_cowl',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('faction armor paintings', () => {
  it('maps obtainable live leather and mail armor only', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('armor');
      expect(['leather', 'mail']).toContain(ITEMS[id]?.armorType);
      expect(FACTION_VENDOR_GATES[id]).toBeDefined();
      expect(factionArmorOriginalItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(factionArmorOriginalItemImageUrl('../riftwalkers_tunic')).toBeNull();
  });
  it('pins distinct decoded originals, deliveries, and style references', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/faction-armor-original-generation.json', 'utf8'),
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
