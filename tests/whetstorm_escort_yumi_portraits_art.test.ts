import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { YUMI_TEMPLATE_ID } from '../src/sim/content/yumi';
import { ESCORTS, MOBS } from '../src/sim/data';
import { targetPortraitUrl } from '../src/ui/target_portrait_view';

it('ships distinct original portraits for live escort mobs and the Yumi objective', async () => {
  const ids = [
    'apprentice_wren',
    'gravedigger_mosley',
    'castaway_navigator',
    'fisher_bram',
    'yumi_cat',
  ];
  const escortIds = Object.values(ESCORTS).map((escort) => escort.npcMobId);
  for (const id of ids.slice(0, 4)) expect(escortIds).toContain(id);
  expect(YUMI_TEMPLATE_ID).toBe('yumi_cat');
  const record = JSON.parse(
    readFileSync('docs/whetstorm/escort-yumi-portraits-generation.json', 'utf8'),
  );
  expect(record.source).toBe('OpenAI built-in image generation');
  expect(record.externalReferenceImages).toEqual([]);
  expect(record.assets.map((asset: { id: string }) => asset.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const asset of record.assets) {
    expect(MOBS[asset.id]).toBeDefined();
    expect(asset.masterPath).toBe(`docs/design/whetstorm-art/mobs/${asset.id}.png`);
    expect(asset.deliveryPath).toBe(`public/ui/whetstorm/mobs/${asset.id}.webp`);
    expect(targetPortraitUrl(asset.id, true)).toBe(`/ui/whetstorm/mobs/${asset.id}.webp`);
    for (const [path, hash] of [
      [asset.masterPath, asset.masterSha256],
      [asset.deliveryPath, asset.deliverySha256],
    ]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
    }
    expect(await sharp(asset.deliveryPath).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    const master = await sharp(asset.masterPath).metadata();
    expect(master.format).toBe('png');
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.height).toBeGreaterThanOrEqual(512);
    hashes.add(asset.deliverySha256);
  }
  expect(hashes.size).toBe(ids.length);
});
