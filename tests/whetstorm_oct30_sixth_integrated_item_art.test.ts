import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { itemImageUrl } from '../src/ui/icons';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';

const ids = [
  'moonshroud_tunic',
  'selthes_seastriders',
  'stormscale_treads',
  'verdant_walkers',
  'sunspun_vestments',
  'sunspun_leggings',
  'reinforced_armor_kit',
  'dense_sharpening_stone',
];
const manifests = ['armor-worldquest-oct30-third-generation', 'recipe-output-item-art-generation'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes live items and existing heroic variants to the exact original art', () => {
  expect(ids.filter((id) => ITEMS[`heroic_${id}`])).toEqual([
    'moonshroud_tunic',
    'selthes_seastriders',
    'verdant_walkers',
  ]);
  for (const id of ids) {
    expect(ITEMS[id]).toBeDefined();
    const path = `/ui/whetstorm/items/${id}.webp`;
    expect(paintedItemImageUrl(id)).toBe(path);
    expect(itemImageUrl(id)).toBe(path);
    const heroic = `heroic_${id}`;
    if (ITEMS[heroic]) {
      expect(paintedItemImageUrl(heroic)).toBe(path);
      expect(itemImageUrl(heroic)).toBe(path);
    }
  }
  for (const id of ['__proto__', 'constructor', '../moonshroud_tunic', 'unknown']) {
    expect(paintedItemImageUrl(id)).toBeNull();
  }
});

it('pins distinct opaque paintings and provenance', async () => {
  const assets = manifests.flatMap(
    (name) => JSON.parse(readFileSync(`docs/whetstorm/${name}.json`, 'utf8')).assets,
  );
  expect(assets.map((a: { itemId: string }) => a.itemId).sort()).toEqual([...ids].sort());
  const masters = new Set<string>();
  const deliveries = new Set<string>();
  for (const a of assets) {
    expect(a.source).toBe('OpenAI built-in image generation');
    expect(a.prompt.length).toBeGreaterThan(50);
    expect(a.file).toBe(`docs/design/whetstorm-art/items/${a.itemId}.png`);
    expect(a.delivery.path).toBe(`public/ui/whetstorm/items/${a.itemId}.webp`);
    expect(hash(a.file)).toBe(a.sha256);
    expect(hash(a.delivery.path)).toBe(a.delivery.sha256);
    const master = await sharp(a.file).metadata();
    const delivery = await sharp(a.delivery.path).metadata();
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.height).toBe(master.width);
    expect(master.hasAlpha).toBe(false);
    expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
    expect(readFileSync(a.delivery.path).length).toBeLessThan(16_384);
    masters.add(a.sha256);
    deliveries.add(a.delivery.sha256);
  }
  expect(masters.size).toBe(ids.length);
  expect(deliveries.size).toBe(ids.length);
});
