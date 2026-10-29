import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { foodEvergardenGreensItemImageUrl } from '../src/ui/food_evergarden_greens_item_art';

it('maps the live dish and pins its decodable original and delivery', async () => {
  const id = 'evergarden_braised_greens';
  expect(ITEMS[id]?.kind).toBe('food');
  expect(foodEvergardenGreensItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
  expect(foodEvergardenGreensItemImageUrl(`../${id}`)).toBeNull();
  const {
    assets: [asset],
  } = JSON.parse(readFileSync('docs/whetstorm/food-evergarden-greens-generation.json', 'utf8'));
  expect(asset.itemId).toBe(id);
  for (const [path, hash] of [
    [asset.file, asset.sha256],
    [asset.delivery.path, asset.delivery.sha256],
  ]) {
    expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
    await sharp(path).raw().toBuffer();
  }
  expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
    width: 128,
    height: 128,
    format: 'webp',
  });
});
