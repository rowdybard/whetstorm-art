import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { skullsplitterItemImageUrl } from '../src/ui/skullsplitter_item_art';

it('maps the live weapon to its original, decodable painting', async () => {
  expect(ITEMS.skullsplitter_dirk?.kind).toBe('weapon');
  expect(skullsplitterItemImageUrl('skullsplitter_dirk')).toBe('/ui/whetstorm/items/skullsplitter_dirk.webp');
  expect(skullsplitterItemImageUrl('../skullsplitter_dirk')).toBeNull();
  const { assets } = JSON.parse(readFileSync('docs/whetstorm/weapon-skullsplitter-generation.json', 'utf8'));
  const asset = assets[0];
  expect(asset.itemId).toBe('skullsplitter_dirk');
  for (const [path, hash] of [[asset.file, asset.sha256], [asset.delivery.path, asset.delivery.sha256]]) {
    expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
  }
  expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp', hasAlpha: false });
  expect(readFileSync(asset.delivery.path).length).toBeLessThanOrEqual(15 * 1024);
});
