import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import evidence from '../docs/whetstorm/profession-intermediate-second-generation.json';
import { ALL_RECIPES, INTERMEDIATE_RECIPES } from '../src/sim/content/recipes';
import { ITEMS } from '../src/sim/data';
import { professionIntermediateSecondItemImageUrl } from '../src/ui/profession_intermediate_second_item_art';

it('maps crafted profession intermediates to distinct intact original paintings', async () => {
  const ids = ['prismglass_setting', 'precision_chassis', 'quickening_catalyst', 'sablewax_vellum'];
  const hashes = new Set<string>();
  for (const id of ids) {
    expect(ITEMS[id]?.kind).toBe('junk');
    expect(
      INTERMEDIATE_RECIPES.some((recipe) => recipe.resultItemId === id && recipe.skillReq === 75),
    ).toBe(true);
    expect(
      ALL_RECIPES.some((recipe) => recipe.reagents.some((reagent) => reagent.itemId === id)),
    ).toBe(true);
    const url = professionIntermediateSecondItemImageUrl(id);
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
  expect(professionIntermediateSecondItemImageUrl('__proto__')).toBeNull();
  expect(professionIntermediateSecondItemImageUrl('missing')).toBeNull();
});
