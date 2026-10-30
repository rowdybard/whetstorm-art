import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { TRINKET_AURA_ITEM } from '../src/sim/content/trinkets';
import { heroicTrinketItemImageUrl } from '../src/ui/heroic_trinket_item_art';
import { auraImageUrl, itemImageUrl } from '../src/ui/icons';

it('maps heroic trinkets to distinct original paintings with intact provenance', async () => {
  const ids = ['bastion_sigil', 'mooring_stone', 'menders_hourglass', 'wellspring_seed'];
  const { records } = JSON.parse(
    readFileSync('docs/whetstorm/heroic-trinket-generation.json', 'utf8'),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const record of records) {
    expect(ITEMS[record.id]).toBeDefined();
    expect(heroicTrinketItemImageUrl(record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
    const url = `/ui/whetstorm/items/${record.id}.webp`;
    expect(itemImageUrl(record.id)).toBe(url);
    const auraIds = Object.entries(TRINKET_AURA_ITEM)
      .filter(([, itemId]) => itemId === record.id)
      .map(([auraId]) => auraId);
    expect(auraIds.length).toBeGreaterThan(0);
    for (const auraId of auraIds) expect(auraImageUrl(auraId)).toBe(url);
    expect(record.shipping).toBe(`public/ui/whetstorm/items/${record.id}.webp`);
    expect(record.referenceImages).toEqual([]);
    for (const [path, hash] of [
      [record.master, record.masterSha256],
      [record.shipping, record.shippingSha256],
    ]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
    }
    const image = sharp(record.shipping);
    expect(await image.metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    await image.raw().toBuffer();
    hashes.add(record.shippingSha256);
  }
  expect(hashes.size).toBe(ids.length);
  expect(heroicTrinketItemImageUrl('unknown')).toBeNull();
});
