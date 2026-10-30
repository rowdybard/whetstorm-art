import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { factionStandingDeedImageUrl } from '../src/ui/faction_standing_deed_art';
import { deedImageUrl } from '../src/ui/icons';

it('resolves faction Champion paintings and verifies their provenance', async () => {
  const ids = [
    'prog_rift_watch_champion',
    'prog_church_order_champion',
    'prog_automatons_champion',
  ];
  const { records } = JSON.parse(
    readFileSync('docs/whetstorm/deed-faction-champion-generation.json', 'utf8'),
  );
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const record of records) {
    expect(DEEDS[record.id]).toBeDefined();
    const url = `/ui/whetstorm/deeds/${record.id}.webp`;
    expect(factionStandingDeedImageUrl(record.id)).toBe(url);
    expect(earlyDeedImageUrl(record.id)).toBe(url);
    const crestId = deedCrestId(record.id, DEEDS[record.id].category);
    expect(crestId).toBe(`deed_${record.id}`);
    expect(deedCrestHasPaintedArt(crestId)).toBe(true);
    expect(deedImageUrl(crestId)).toBe(url);
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
