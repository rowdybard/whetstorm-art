import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { crucibleMailPatternItemImageUrl } from '../src/ui/crucible_mail_pattern_item_art';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

it('maps Crucible mail manuals to distinct original paintings', async () => {
  const ids = [
    'pattern_crucible_str_mail',
    'pattern_crucible_tank_mail',
    'pattern_crucible_caster_mail',
    'pattern_crucible_healer_mail',
  ];
  const { records } = JSON.parse(
    readFileSync('docs/whetstorm/crucible-mail-pattern-generation.json', 'utf8'),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const record of records) {
    expect(ITEMS[record.id]?.kind).toBe('recipe');
    expect(crucibleMailPatternItemImageUrl(record.id)).toBe(
      `/ui/whetstorm/items/${record.id}.webp`,
    );
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
  expect(crucibleMailPatternItemImageUrl('unknown')).toBeNull();
});
