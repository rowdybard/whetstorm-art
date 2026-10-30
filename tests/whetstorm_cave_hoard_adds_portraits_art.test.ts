import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { CAVE_THEMES } from '../src/sim/content/rift/cave_themes';
import { HOARD_MOBS, RIFT_MOBS } from '../src/sim/content/rift/mobs';
import { HOARD_BAT_SWARMLING_TEMPLATE } from '../src/sim/rift/hoard_bat_core';
import {
  HOARD_BLOAT_CAP_TEMPLATE,
  HOARD_SPORELING_TEMPLATE,
} from '../src/sim/rift/hoard_mushroom_core';
import { targetPortraitUrl } from '../src/ui/target_portrait_view';

it('keeps distinct original portraits for cave enemies and their live template IDs', async () => {
  const ids = [
    HOARD_BLOAT_CAP_TEMPLATE,
    HOARD_SPORELING_TEMPLATE,
    HOARD_BAT_SWARMLING_TEMPLATE,
    'rift_stone_ogre',
  ];
  expect(CAVE_THEMES.find((theme) => theme.id === 'burrow')?.trash).toContain('rift_stone_ogre');
  const record = JSON.parse(
    readFileSync('docs/whetstorm/cave-hoard-adds-portraits-generation.json', 'utf8'),
  );
  expect(record.source).toBe('OpenAI built-in image generation');
  expect(record.externalReferenceImages).toEqual([]);
  expect(record.assets.map((asset: { id: string }) => asset.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const asset of record.assets) {
    expect(HOARD_MOBS[asset.id] ?? RIFT_MOBS[asset.id]).toBeDefined();
    expect(asset.prompt.length).toBeGreaterThan(100);
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
