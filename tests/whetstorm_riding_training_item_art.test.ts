import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS, NPCS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { ridingTrainingItemImageUrl } from '../src/ui/riding_training_item_art';

const id = 'riding_training';
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the riding training service to its painting', () => {
  expect(ITEMS[id]).toMatchObject({ kind: 'tool', teachesRiding: true, buyValue: 800000 });
  expect(Object.values(NPCS).some((npc) => npc.vendorItems?.includes(id))).toBe(true);
  const url = `/ui/whetstorm/items/${id}.webp`;
  expect(ridingTrainingItemImageUrl(id)).toBe(url);
  expect(itemImageUrl(id)).toBe(url);
  expect(iconDataUrl('item', id)).toBe(url);
  expect(ridingTrainingItemImageUrl('__proto__')).toBeNull();
});

it('pins the original master and 128px shipping image', async () => {
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/riding-training-generation.json', 'utf8'));
  expect(assets).toHaveLength(1);
  const asset = assets[0];
  expect(asset.itemId).toBe(id);
  expect(asset.source).toBe('OpenAI built-in image generation');
  expect(hash(asset.file)).toBe(asset.sha256);
  expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
  const master = await sharp(asset.file).metadata();
  expect(master.width).toBeGreaterThanOrEqual(512);
  expect(master.height).toBe(master.width);
  expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
});
