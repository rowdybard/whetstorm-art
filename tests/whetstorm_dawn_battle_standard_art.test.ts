import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { dawnBattleStandardItemImageUrl } from '../src/ui/dawn_battle_standard_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

const id = 'dawn_battle_standard';
const path = `/ui/whetstorm/items/${id}.webp`;
const hash = (file: string) => createHash('sha256').update(readFileSync(file)).digest('hex');

describe('Dawn Battle Standard painting', () => {
  it('resolves the live faction toy through the production icon path', () => {
    expect(ITEMS[id]).toMatchObject({ kind: 'tool', use: { type: 'dawnStandard' } });
    expect(dawnBattleStandardItemImageUrl(id)).toBe(path);
    expect(itemImageUrl(id)).toBe(path);
    expect(iconDataUrl('item', id)).toBe(path);
    expect(dawnBattleStandardItemImageUrl('../dawn_battle_standard')).toBeNull();
  });

  it('pins the decodable master and delivery artwork', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/dawn-battle-standard-generation.json', 'utf8'));
    expect(assets).toHaveLength(1);
    const asset = assets[0];
    expect(asset.itemId).toBe(id);
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    expect(asset.prompt.length).toBeGreaterThan(50);
    const original = await sharp(asset.file).metadata();
    const delivery = await sharp(asset.delivery.path).metadata();
    expect(original.width).toBeGreaterThanOrEqual(512);
    expect(original.height).toBe(original.width);
    expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
  });
});
