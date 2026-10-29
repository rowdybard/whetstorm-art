import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { questHighwatchSecondItemImageUrl } from '../src/ui/quest_highwatch_second_item_art';

const ids = ['ogre_war_totem', 'wyrmcult_orders', 'ritual_phylactery', 'vanguard_bone'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Highwatch quest object paintings', () => {
  it('maps the intended live quest items and rejects unknown IDs', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('quest');
      expect(questHighwatchSecondItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(questHighwatchSecondItemImageUrl('../ogre_war_totem')).toBeNull();
  });
  it('pins distinct decodable originals and 128px deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/quest-highwatch-second-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { itemId: string }) => asset.itemId)).toEqual(ids);
    const originals = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const original = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(original.width).toBeGreaterThanOrEqual(512);
      expect(original.height).toBe(original.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      originals.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(originals.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
