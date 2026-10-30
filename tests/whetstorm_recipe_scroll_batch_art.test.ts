import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { itemImageUrl } from '../src/ui/icons';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';
import { recipeScrollBatchItemImageUrl } from '../src/ui/recipe_scroll_batch_item_art';

const ids = [
  'recipe_potion_of_invisibility',
  'recipe_elixir_of_mana_regeneration',
  'pattern_highwatch_gourd_soup',
  'pattern_highwatch_barley_porridge',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('recipe scroll paintings', () => {
  it('maps live recipe items and rejects arbitrary paths', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('recipe');
      expect(ITEMS[`heroic_${id}`]).toBeUndefined();
      expect(recipeScrollBatchItemImageUrl(`heroic_${id}`)).toBeNull();
      expect(recipeScrollBatchItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(paintedItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(recipeScrollBatchItemImageUrl('../recipe_potion_of_invisibility')).toBeNull();
  });
  it('pins distinct decodable paintings and deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/recipe-scroll-batch-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const hashes = new Set<string>();
    for (const asset of assets) {
      expect(asset.source).toBe('OpenAI built-in image generation');
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(asset.file).toBe(`docs/design/whetstorm-art/items/${asset.itemId}.png`);
      expect(asset.delivery.path).toBe(`public/ui/whetstorm/items/${asset.itemId}.webp`);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(readFileSync(asset.delivery.path).length).toBeLessThanOrEqual(15360);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
      hashes.add(asset.delivery.sha256);
    }
    expect(hashes.size).toBe(ids.length);
  });
});
