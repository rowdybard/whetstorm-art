import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { crucibleSigilItemImageUrl } from '../src/ui/crucible_sigil_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps Crucible helm and shoulder sigils to distinct original paintings', async () => {
  const ids = [
    'sigil_ember_helmet',
    'sigil_tempest_helmet',
    'sigil_ember_shoulder',
    'sigil_tempest_shoulder',
  ];
  const { records } = JSON.parse(
    readFileSync('docs/whetstorm/crucible-sigil-helm-shoulder-generation.json', 'utf8'),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const record of records) {
    expect(ITEMS[record.id]).toBeDefined();
    expect(crucibleSigilItemImageUrl(record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
    const url = `/ui/whetstorm/items/${record.id}.webp`;
    expect(itemImageUrl(record.id)).toBe(url);
    expect(iconDataUrl('item', record.id)).toBe(url);
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
  expect(crucibleSigilItemImageUrl('unknown')).toBeNull();
});
