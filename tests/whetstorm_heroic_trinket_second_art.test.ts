import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { TRINKET_AURA_ITEM } from '../src/sim/content/trinkets';
import { ITEMS } from '../src/sim/data';
import { heroicTrinketItemImageUrl } from '../src/ui/heroic_trinket_item_art';
import { auraImageUrl, itemImageUrl } from '../src/ui/icons';

it('resolves four heroic trinket paintings and their auras with intact provenance', async () => {
  const ids = ['paired_talons', 'hunters_tally', 'stormjar', 'echoing_lens'];
  const { records } = JSON.parse(
    readFileSync('docs/whetstorm/heroic-trinket-second-generation.json', 'utf8'),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const record of records) {
    expect(ITEMS[record.id]).toBeDefined();
    const url = `/ui/whetstorm/items/${record.id}.webp`;
    expect(heroicTrinketItemImageUrl(record.id)).toBe(url);
    expect(itemImageUrl(record.id)).toBe(url);
    const auraIds = Object.entries(TRINKET_AURA_ITEM)
      .filter(([, id]) => id === record.id)
      .map(([id]) => id);
    expect(auraIds.length).toBeGreaterThan(0);
    for (const auraId of auraIds) expect(auraImageUrl(auraId)).toBe(url);
    expect(record.shipping).toBe(`public${url}`);
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
});
