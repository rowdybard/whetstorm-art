import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { whetstormShamanSignatureImageUrl } from '../src/ui/whetstorm_shaman_signature_art';

it('maps live Shaman abilities to distinct original paintings with intact masters', async () => {
  const provenance = JSON.parse(
    readFileSync('public/ui/whetstorm/abilities/shaman-signatures-provenance.json', 'utf8'),
  );
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual([
    'lightning_bolt',
    'rockbiter_weapon',
    'healing_wave',
    'earth_shock',
  ]);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(ABILITIES[entry.id]?.class).toBe('shaman');
    expect(whetstormShamanSignatureImageUrl(entry.id)).toBe(
      `/${entry.path.slice('public/'.length)}`,
    );
    for (const file of [entry, entry.master]) {
      const bytes = readFileSync(file.path);
      expect(bytes.length).toBe(file.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
    }
    const bytes = readFileSync(entry.path);
    expect(await sharp(bytes).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    await sharp(bytes).raw().toBuffer();
    hashes.add(entry.sha256);
  }
  expect(hashes.size).toBe(4);
  expect(whetstormShamanSignatureImageUrl('../lightning_bolt')).toBeNull();
  expect(whetstormShamanSignatureImageUrl('charge')).toBeNull();
});
