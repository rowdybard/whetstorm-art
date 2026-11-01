import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl, UI_ITEM_IMAGE_IDS } from '../src/ui/icons';
import { implicitBackpackItemImageUrl } from '../src/ui/implicit_backpack_item_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the implicit backpack pseudo-item to its original inventory painting', async () => {
  const record = JSON.parse(readFileSync('docs/whetstorm/implicit-backpack-generation.json', 'utf8'));
  expect(Object.hasOwn(ITEMS, 'backpack')).toBe(false);
  expect(UI_ITEM_IMAGE_IDS.has('backpack')).toBe(true);
  expect(record.id).toBe('backpack');
  expect(record.source).toBe('OpenAI built-in image generation');
  expect(record.referenceImages).toEqual([]);
  expect(hash(record.master)).toBe(record.masterSha256);
  expect(hash(record.shipping)).toBe(record.shippingSha256);
  expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128, hasAlpha: false });
  const url = '/ui/whetstorm/items/backpack.webp';
  expect(implicitBackpackItemImageUrl('backpack')).toBe(url);
  expect(implicitBackpackItemImageUrl('linen_pouch')).toBeNull();
  expect(itemImageUrl('backpack')).toBe(url);
  expect(iconDataUrl('item', 'backpack')).toBe(url);
});
