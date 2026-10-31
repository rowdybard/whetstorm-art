import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { chainedEmberChokerTierItemImageUrl } from '../src/ui/chained_ember_choker_tier_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps Chained Ember Choker tiers to distinct original paintings', async () => {
  const ids = ['rare_chained_ember_choker', 'legendary_chained_ember_choker'];
  const qualities = ['rare', 'epic'];
  const { records } = JSON.parse(
    readFileSync(
      'docs/design/whetstorm-art/items/chained-ember-choker-tiers-original/chained-ember-choker-provenance.json',
      'utf8',
    ),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const [index, record] of records.entries()) {
    expect(ITEMS[record.id]).toMatchObject({
      kind: 'armor',
      slot: 'neck',
      quality: qualities[index],
    });
    expect(chainedEmberChokerTierItemImageUrl(record.id)).toBe(
      `/ui/whetstorm/items/${record.id}.webp`,
    );
    expect(itemImageUrl(record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
    expect(iconDataUrl('item', record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
    expect(record.referenceImages).toEqual([]);
    for (const [path, hash] of [
      [record.master, record.masterSha256],
      [record.shipping, record.shippingSha256],
    ]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
    }
    const image = sharp(record.shipping);
    expect(await image.metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
    await image.raw().toBuffer();
    hashes.add(record.shippingSha256);
  }
  expect(hashes.size).toBe(ids.length);
  expect(chainedEmberChokerTierItemImageUrl('unknown')).toBeNull();
});
