import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import evidence from '../docs/whetstorm/farm-produce-fine-generation.json';
import { FARM_CROPS } from '../src/sim/content/farm_crops';
import { ALL_RECIPES } from '../src/sim/content/recipes';
import { ITEMS } from '../src/sim/data';
import { farmProduceFineItemImageUrl } from '../src/ui/farm_produce_fine_item_art';

it('maps live crop and fine harvests to distinct intact original paintings', async () => {
  const rows = [
    ['evergarden_greens', 'evergarden_greens', false],
    ['fine_frost_lentils', 'frost_lentils', true],
    ['fine_gilded_yam', 'gilded_yam', true],
    ['fine_evergarden_pumpkin', 'evergarden_pumpkin', true],
  ] as const;
  const hashes = new Set<string>();
  for (const [id, crop, fine] of rows) {
    expect(ITEMS[id]).toBeDefined();
    expect(fine ? FARM_CROPS[crop].fineProduceItemId : FARM_CROPS[crop].produceItemId).toBe(id);
    expect(
      ALL_RECIPES.some((recipe) => recipe.reagents.some((reagent) => reagent.itemId === id)),
    ).toBe(true);
    const url = farmProduceFineItemImageUrl(id);
    expect(url).toBe(`/ui/whetstorm/items/${id}.webp`);
    const bytes = readFileSync(`public${url}`);
    const hash = createHash('sha256').update(bytes).digest('hex');
    expect(hash).toBe(evidence.assets.find((asset) => asset.itemId === id)?.delivery.sha256);
    hashes.add(hash);
    const metadata = await sharp(bytes).metadata();
    expect([metadata.format, metadata.width, metadata.height, metadata.hasAlpha]).toEqual([
      'webp',
      128,
      128,
      false,
    ]);
  }
  expect(hashes.size).toBe(rows.length);
  expect(farmProduceFineItemImageUrl('__proto__')).toBeNull();
  expect(farmProduceFineItemImageUrl('missing')).toBeNull();
});
