import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { whetstormRogueSignatureImageUrl } from '../src/ui/whetstorm_rogue_signature_art';

it('maps live Rogue abilities to distinct original paintings with intact masters', async () => {
  const provenance = JSON.parse(
    readFileSync('public/ui/whetstorm/abilities/rogue-signatures-provenance.json', 'utf8'),
  );
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual([
    'sinister_strike',
    'eviscerate',
    'backstab',
    'stealth',
  ]);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(ABILITIES[entry.id]?.class).toBe('rogue');
    expect(whetstormRogueSignatureImageUrl(entry.id)).toBe(
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
  expect(whetstormRogueSignatureImageUrl('../stealth')).toBeNull();
  expect(whetstormRogueSignatureImageUrl('charge')).toBeNull();
});
