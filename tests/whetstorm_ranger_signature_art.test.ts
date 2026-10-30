import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { whetstormRangerSignatureImageUrl } from '../src/ui/whetstorm_ranger_signature_art';

it('resolves distinct Ranger paintings with intact masters and runtime assets', async () => {
  const manifest = JSON.parse(
    readFileSync('public/ui/whetstorm/abilities/ranger-signatures-provenance.json', 'utf8'),
  );
  const ids = ['measured_shot', 'pack_command', 'frostjaw_trap', 'trailbreak'];
  expect(manifest.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const entry of manifest.entries) {
    expect(ABILITIES[entry.id]?.class).toBe('hunter');
    expect(whetstormRangerSignatureImageUrl(entry.id)).toBe(
      `/ui/whetstorm/abilities/${entry.id}.webp`,
    );
    for (const asset of [entry, entry.master]) {
      const bytes = readFileSync(asset.path);
      expect(bytes.length).toBe(asset.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(asset.sha256);
    }
    hashes.add(entry.sha256);
    const runtime = readFileSync(entry.path);
    expect(await sharp(runtime).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    await sharp(runtime).raw().toBuffer();
  }
  expect(hashes.size).toBe(ids.length);
  expect(whetstormRangerSignatureImageUrl('../trailbreak')).toBeNull();
  expect(whetstormRangerSignatureImageUrl('charge')).toBeNull();
});
