import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { itemImageUrl } from '../src/ui/icons';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';

const ids = [
  'zealotsbane_blade',
  'emberwood_staff',
  'cultist_flayer',
  'ironvein_pickblade',
  'murloc_hut',
  'hedgewick_tool_cart',
  'sprung_trap',
  'shear_storm_lantern',
  'cragmaw_huntquiver',
  'gravewyrm_bone_quiver',
  'direfang_quiver',
  'duskforged_bulwark',
  'templar_dawn_shield',
  'forgemasters_girdle',
  'forgemasters_sabatons',
];
const manifests = [
  'weapon-quest-foreman-oct30-generation',
  'quest-objects-oct30-second-generation',
  'offhand-shield-quiver-oct30-generation',
  'armor-batch-faction-forge-generation',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes live items and existing heroic variants to the exact original art', () => {
  expect(ids.filter((id) => ITEMS[`heroic_${id}`])).toEqual([
    'gravewyrm_bone_quiver',
    'direfang_quiver',
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
  for (const id of ['__proto__', 'constructor', '../cultist_flayer', 'unknown']) {
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
