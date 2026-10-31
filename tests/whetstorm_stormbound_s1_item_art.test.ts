import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { stormboundS1ItemImageUrl } from '../src/ui/stormbound_s1_item_art';

it('maps the Stormbound mail slots to distinct original paintings', async () => {
  const ids = ['stormbound_crown', 'stormbound_spaulders', 'stormbound_hauberk'];
  const slots = ['helmet', 'shoulder', 'chest'];
  const { records } = JSON.parse(
    readFileSync(
      'docs/design/whetstorm-art/items/stormbound-s1-original/stormbound-provenance.json',
      'utf8',
    ),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const [index, record] of records.entries()) {
    expect(ITEMS[record.id]).toMatchObject({
      kind: 'armor',
      armorType: 'mail',
      slot: slots[index],
    });
    expect(stormboundS1ItemImageUrl(record.id)).toBe(`/ui/whetstorm/items/${record.id}.webp`);
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
  expect(stormboundS1ItemImageUrl('unknown')).toBeNull();
});

it('maps the remaining Stormbound mail slots through production', async () => {
  const ids = [
    'stormbound_waistguard',
    'stormbound_legmail',
    'stormbound_handguards',
    'stormbound_greaves',
  ];
  const slots = ['waist', 'legs', 'gloves', 'feet'];
  const { records } = JSON.parse(
    readFileSync(
      'docs/design/whetstorm-art/items/stormbound-s1-second-original/stormbound-second-provenance.json',
      'utf8',
    ),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const [index, record] of records.entries()) {
    expect(ITEMS[record.id]).toMatchObject({
      kind: 'armor',
      armorType: 'mail',
      slot: slots[index],
    });
    const url = `/ui/whetstorm/items/${record.id}.webp`;
    expect(stormboundS1ItemImageUrl(record.id)).toBe(url);
    expect(itemImageUrl(record.id)).toBe(url);
    expect(iconDataUrl('item', record.id)).toBe(url);
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
});
