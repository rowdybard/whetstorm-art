import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { mailDelveOriginalItemImageUrl } from '../src/ui/mail_delve_original_item_art';

it('maps distinct live mail pieces to their recorded original paintings', async () => {
  const manifest = JSON.parse(
    readFileSync('docs/whetstorm/mail-delve-original-generation.json', 'utf8'),
  );
  const ids = [
    'litany_shoulder',
    'litany_plate_chest',
    'deacon_reliquary_helm',
    'morthens_cryptforged_hauberk',
  ];
  expect(manifest.assets.map((asset: { id: string }) => asset.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const asset of manifest.assets) {
    expect(ITEMS[asset.id]?.armorType).toBe('mail');
    expect(mailDelveOriginalItemImageUrl(asset.id)).toBe(`/ui/whetstorm/items/${asset.id}.webp`);
    for (const [path, expected] of [
      [asset.master, asset.master_sha256],
      [asset.runtime, asset.runtime_sha256],
    ]) {
      expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(expected);
    }
    const meta = await sharp(asset.runtime).metadata();
    expect([meta.width, meta.height, meta.format]).toEqual([128, 128, 'webp']);
    hashes.add(asset.runtime_sha256);
  }
  expect(hashes.size).toBe(ids.length);
  expect(mailDelveOriginalItemImageUrl('unknown')).toBeNull();
});
