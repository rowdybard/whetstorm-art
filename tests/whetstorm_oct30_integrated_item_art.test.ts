import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { itemImageUrl } from '../src/ui/icons';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';

const ids = [
  'wildheart_tuskblade',
  'wildheart_hexwood_staff',
  'wildheart_fangknife',
  'bristlehide_spaulders',
  'wanderers_chestguard',
  'forgefathers_ember',
  'gyrelens_array',
  'voidbound_grimoire',
  'copperlens_ocular',
  'wraithfire_orb',
  'evergarden_statue_rubbing',
  'vigil_star_chart',
  'sunken_offering_bowl',
  'hollow_sealstone',
];
const manifests = [
  'wildheart-weapon-original-generation',
  'early-leather-oct30-generation',
  'material-forgefather-oct30-generation',
  'accessory-held-oct30-generation',
  'quest-objects-oct30-generation',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes each live item to its own original painting', () => {
  for (const id of ids) {
    expect(ITEMS[id]).toBeDefined();
    expect(paintedItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
  }
  for (const base of ['wildheart_tuskblade', 'wildheart_hexwood_staff', 'wildheart_fangknife']) {
    expect(ITEMS[`heroic_${base}`]).toBeDefined();
    expect(itemImageUrl(`heroic_${base}`)).toBe(`/ui/whetstorm/items/${base}.webp`);
  }
  for (const id of ['__proto__', 'constructor', '../wildheart_tuskblade', 'unknown']) {
    expect(paintedItemImageUrl(id)).toBeNull();
  }
});

it('pins distinct opaque masters, delivery images and generation evidence', async () => {
  const assets = manifests.flatMap(
    (name) => JSON.parse(readFileSync(`docs/whetstorm/${name}.json`, 'utf8')).assets,
  );
  expect(assets.map((asset: { itemId: string }) => asset.itemId).sort()).toEqual([...ids].sort());
  const masters = new Set<string>();
  const deliveries = new Set<string>();
  for (const asset of assets) {
    expect(asset.source).toBe('OpenAI built-in image generation');
    expect(asset.prompt.length).toBeGreaterThan(50);
    expect(asset.file).toBe(`docs/design/whetstorm-art/items/${asset.itemId}.png`);
    expect(asset.delivery.path).toBe(`public/ui/whetstorm/items/${asset.itemId}.webp`);
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    const original = await sharp(asset.file).metadata();
    const delivery = await sharp(asset.delivery.path).metadata();
    expect(original.width).toBeGreaterThanOrEqual(512);
    expect(original.height).toBe(original.width);
    expect(original.hasAlpha).toBe(false);
    expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
    expect(readFileSync(asset.delivery.path).length).toBeLessThan(16_384);
    masters.add(asset.sha256);
    deliveries.add(asset.delivery.sha256);
  }
  expect(masters.size).toBe(ids.length);
  expect(deliveries.size).toBe(ids.length);
});
