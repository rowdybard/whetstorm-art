import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { RIFT_MOBS } from '../src/sim/content/rift/mobs';

it('preserves distinct original portraits for the Infernal Citadel creatures', async () => {
  const ids = ['rift_boss_ritualist', 'rift_boss_pitlord', 'rift_hellguard', 'rift_pact_acolyte'];
  const record = JSON.parse(
    readFileSync('docs/whetstorm/infernal-citadel-portraits-generation.json', 'utf8'),
  );
  expect(record.source).toBe('OpenAI built-in image generation');
  expect(record.externalReferenceImages).toEqual([]);
  expect(record.assets.map((asset: { id: string }) => asset.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const asset of record.assets) {
    expect(RIFT_MOBS[asset.id]).toBeDefined();
    expect(asset.prompt.length).toBeGreaterThan(100);
    expect(asset.masterPath).toBe(`docs/design/whetstorm-art/mobs/${asset.id}.png`);
    expect(asset.deliveryPath).toBe(`public/ui/whetstorm/mobs/${asset.id}.webp`);
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
