import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { HEROIC_BOSS_LOOT } from '../src/sim/content/heroic_loot';
import { ITEMS } from '../src/sim/data';
import { heroicMailOriginalItemImageUrl } from '../src/ui/heroic_mail_original_item_art';

const ids = ['gravewyrm_claws', 'gravescale_girdle', 'mistforged_pauldrons'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('heroic mail paintings', () => {
  it('maps live mail armor obtainable from heroic bosses', () => {
    for (const id of ids) {
      expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'mail' });
      expect(heroicMailOriginalItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(HEROIC_BOSS_LOOT.korzul_the_gravewyrm.map((row) => row.itemId)).toEqual(
      expect.arrayContaining(ids.slice(0, 2)),
    );
    expect(HEROIC_BOSS_LOOT.vael_the_mistcaller.map((row) => row.itemId)).toContain(ids[2]);
    expect(heroicMailOriginalItemImageUrl('../gravescale_girdle')).toBeNull();
  });
  it('pins distinct decoded originals, deliveries, and style references', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/heroic-mail-original-generation.json', 'utf8'),
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
