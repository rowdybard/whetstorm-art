import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { sovereignEmberforgeItemImageUrl } from '../src/ui/sovereign_emberforge_item_art';

it('maps Sovereign Emberforge armor to distinct original paintings', async () => {
  const ids = [
    'legendary_ember_wrought_crown',
    'legendary_cinder_stitched_robes',
    'legendary_molten_clinker_girdle',
  ];
  const slots = ['helmet', 'chest', 'waist'];
  const armor = ['mail', 'cloth', 'mail'];
  const { records } = JSON.parse(
    readFileSync(
      'docs/design/whetstorm-art/items/sovereign-emberforge-original/sovereign-emberforge-provenance.json',
      'utf8',
    ),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const [index, record] of records.entries()) {
    expect(ITEMS[record.id]).toMatchObject({
      kind: 'armor',
      armorType: armor[index],
      slot: slots[index],
      quality: 'epic',
    });
    expect(sovereignEmberforgeItemImageUrl(record.id)).toBe(
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
  expect(sovereignEmberforgeItemImageUrl('unknown')).toBeNull();
});
