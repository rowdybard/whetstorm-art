import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { questBreakscarredSteelItemImageUrl } from '../src/ui/quest_breakscarred_steel_item_art';

it('maps the quest drop to its independently pinned painting', async () => {
  const id = 'breakscarred_steel';
  const {
    assets: [asset],
  } = JSON.parse(readFileSync('docs/whetstorm/quest-breakscarred-steel-generation.json', 'utf8'));
  expect(ITEMS[id]?.kind).toBe('quest');
  expect(asset.itemId).toBe(id);
  expect(questBreakscarredSteelItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
  expect(questBreakscarredSteelItemImageUrl(`../${id}`)).toBeNull();
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
