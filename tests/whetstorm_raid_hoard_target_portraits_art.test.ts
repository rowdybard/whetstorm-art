import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('keeps distinct original raid and hoard portraits tied to their masters', async () => {
  const ids = [
    'hoard_coinsack_scurrier',
    'ignivar_ember_sentinel',
    'ignivar_crucible_warden',
    'ignivar_cinder_artificer',
    'guardian_tithefiend',
  ];
  const record = JSON.parse(
    readFileSync('docs/whetstorm/raid-hoard-target-portraits-generation.json', 'utf8'),
  );
  expect(record.source).toBe('OpenAI built-in image generation');
  expect(record.externalReferenceImages).toEqual([]);
  expect(record.assets.map((asset: { id: string }) => asset.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const asset of record.assets) {
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
    });
    expect(await sharp(asset.masterPath).metadata()).toMatchObject({
      format: 'png',
      width: asset.masterDimensions[0],
      height: asset.masterDimensions[1],
    });
    hashes.add(asset.deliverySha256);
  }
  expect(hashes.size).toBe(ids.length);
});
