import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import evidence from '../docs/whetstorm/farm-produce-original-generation.json';
import { FARM_CROPS } from '../src/sim/content/farm_crops';
import { ALL_RECIPES } from '../src/sim/content/recipes';
import { ITEMS } from '../src/sim/data';
import { farmProduceOriginalItemImageUrl } from '../src/ui/farm_produce_original_item_art';

it('maps live crop harvests to distinct intact original paintings', async () => {
  const ids = ['frost_lentils', 'gilded_yam', 'evergarden_pumpkin', 'gilded_sunmelon'];
  const hashes = new Set<string>();
  for (const id of ids) {
    expect(ITEMS[id]).toBeDefined();
    expect(FARM_CROPS[id]?.produceItemId).toBe(id);
    expect(FARM_CROPS[id]?.seedItemId).toBe(`${id}_seed`);
    expect(
      ALL_RECIPES.some((recipe) => recipe.reagents.some((reagent) => reagent.itemId === id)),
    ).toBe(true);
    const url = farmProduceOriginalItemImageUrl(id);
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
  expect(hashes.size).toBe(ids.length);
  expect(farmProduceOriginalItemImageUrl('__proto__')).toBeNull();
  expect(farmProduceOriginalItemImageUrl('missing')).toBeNull();
});
