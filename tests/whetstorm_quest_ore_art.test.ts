import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { paintedItemImageUrl } from '../src/ui/painted_item_art';
import { questOreItemImageUrl } from '../src/ui/quest_ore_item_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('legacy quest ore painting', () => {
  it('maps only the retained quest item', () => {
    expect(ITEMS.chunk_of_ore?.kind).toBe('quest');
    expect(questOreItemImageUrl('chunk_of_ore')).toBe('/ui/whetstorm/items/chunk_of_ore.webp');
    expect(paintedItemImageUrl('chunk_of_ore')).toBe('/ui/whetstorm/items/chunk_of_ore.webp');
    expect(questOreItemImageUrl('../chunk_of_ore')).toBeNull();
  });

  it('pins its decodable original and delivery', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/quest-ore-generation.json', 'utf8'));
    expect(assets).toHaveLength(1);
    const asset = assets[0];
    expect(asset.itemId).toBe('chunk_of_ore');
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    expect(asset.prompt.length).toBeGreaterThan(50);
    const master = await sharp(asset.file).metadata();
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.height).toBe(master.width);
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
      width: 128,
      height: 128,
      format: 'webp',
      hasAlpha: false,
    });
    expect(readFileSync(asset.delivery.path).length).toBeLessThanOrEqual(15 * 1024);
  });
});
