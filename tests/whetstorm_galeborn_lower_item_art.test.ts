import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { galebornLowerItemImageUrl } from '../src/ui/galeborn_lower_item_art';

const ids = ['vanguard_shaman_enhancement_legs', 'vanguard_shaman_enhancement_gloves'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the live Galeborn lower pieces to their paintings', () => {
  for (const [index, slot] of ['legs', 'gloves'].entries()) {
    const id = ids[index];
    expect(ITEMS[id]).toMatchObject({ kind: 'armor', armorType: 'mail', slot, set: 'vanguard_shaman_enhancement' });
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(galebornLowerItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
  }
  expect(galebornLowerItemImageUrl('__proto__')).toBeNull();
});

it('pins distinct original masters and 128px shipping images', async () => {
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/galeborn-lower-generation.json', 'utf8'));
  expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
  const masters = new Set<string>();
  const deliveries = new Set<string>();
  for (const asset of assets) {
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    expect(asset.source).toBe('OpenAI built-in image generation');
    expect(asset.prompt.length).toBeGreaterThan(100);
    const master = await sharp(asset.file).metadata();
    const delivery = await sharp(asset.delivery.path).metadata();
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.height).toBe(master.width);
    expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
    masters.add(asset.sha256);
    deliveries.add(asset.delivery.sha256);
  }
  expect(masters.size).toBe(ids.length);
  expect(deliveries.size).toBe(ids.length);
});
