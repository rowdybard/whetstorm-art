import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { heroicCourtHoardItemImageUrl } from '../src/ui/heroic_court_hoard_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';

const ids = [
  'sash_of_the_sunken_court',
  'sunken_court_mantle',
  'tidewoven_trousers',
  'choirmothers_casque',
  'orb_collapsing_void',
  'glacier_hewn_bulwark',
  'storm_tuned_buckler',
  'chalice_of_living_tides',
  'scorched_supply_crate',
  'wyrmwatch_warning_banner',
  'gullhaven_watchbell',
  'hearth_ember_cache',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the live items, and does not invent heroic variants', () => {
  expect(ids.filter((id) => ITEMS[`heroic_${id}`])).toEqual([]);
  for (const id of ids) {
    expect(Object.hasOwn(ITEMS, id)).toBe(true);
    const path = `/ui/whetstorm/items/${id}.webp`;
    expect(heroicCourtHoardItemImageUrl(id)).toBe(path);
    expect(paintedItemImageUrl(id)).toBe(path);
    expect(itemImageUrl(id)).toBe(path);
    expect(iconDataUrl('item', id)).toBe(path);
    expect(heroicCourtHoardItemImageUrl(`heroic_${id}`)).toBeNull();
  }
  for (const id of ['__proto__', 'constructor', '../sash_of_the_sunken_court', 'unknown']) {
    expect(heroicCourtHoardItemImageUrl(id)).toBeNull();
  }
});

it('pins unique opaque paintings and exact provenance paths', async () => {
  const manifests = [
    'armor-heroic-court-generation',
    'hoard-offhand-oct30-generation',
    'quest-objects-oct30-fourth-generation',
  ];
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
    for (const ref of a.reference_images) expect(hash(ref.path)).toBe(ref.sha256);
    const master = await sharp(a.file).metadata();
    const delivery = await sharp(a.delivery.path).metadata();
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.height).toBe(master.width);
    expect(master.hasAlpha).toBe(false);
    expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
    expect(readFileSync(a.delivery.path).length).toBeLessThan(15 * 1024);
    masters.add(a.sha256);
    deliveries.add(a.delivery.sha256);
  }
  expect(masters.size).toBe(ids.length);
  expect(deliveries.size).toBe(ids.length);
});
