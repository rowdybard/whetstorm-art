import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('keeps the Hollow Crypt and Sunken Bastion portraits distinct and tied to their masters', async () => {
  const ids = ['sexton_marrow', 'tidebound_acolyte', 'drowned_thrall', 'knight_commander_olen'];
  const record = JSON.parse(
    readFileSync('docs/whetstorm/hollow-bastion-target-portraits-generation.json', 'utf8'),
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
    const master = await sharp(asset.masterPath).metadata();
    expect(master).toMatchObject({
      format: 'png',
      width: asset.masterDimensions[0],
      height: asset.masterDimensions[1],
    });
    expect(master.width).toBeGreaterThanOrEqual(512);
    expect(master.width).toBe(master.height);
    hashes.add(asset.deliverySha256);
  }
  expect(hashes.size).toBe(ids.length);
});
