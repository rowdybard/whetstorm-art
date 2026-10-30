import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { whetstormPaladinSignatureImageUrl } from '../src/ui/whetstorm_paladin_signature_art';

it('pins original Paladin signature paintings and their full-resolution masters', async () => {
  const hashes: Record<string, string> = {
    holy_light: 'ccb70dd73ac44d77e131a71da0b2b75b0ad234a38ecd35b62219c672b96c80a5',
    hammer_of_grace: 'e66a0fa30a43a64cda470b9d09f73721e8e4f1defe747f6945736bac7288a58c',
    divine_ascension: '738c65125a6206e049c0c1f558687757d301b84801a87eea34283ff95b7c18c9',
    dawn_devotion: '1df79ed084d40e68d4985ad07ee7eb756d7361903fb6cb802990d27e4541f731',
  };
  const provenance = JSON.parse(
    readFileSync('public/ui/whetstorm/abilities/paladin-signatures-provenance.json', 'utf8'),
  );
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(Object.keys(hashes));
  for (const entry of provenance.entries) {
    const { id, master } = entry;
    expect(ABILITIES[id]?.class).toBe('paladin');
    expect(ABILITIES[id]?.learnLevel).toBeLessThanOrEqual(3);
    expect(whetstormPaladinSignatureImageUrl(id)).toBe(`/ui/whetstorm/abilities/${id}.webp`);
    const bytes = readFileSync(entry.path);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(hashes[id]);
    expect(entry.sha256).toBe(hashes[id]);
    expect(bytes.length).toBe(entry.bytes);
    expect(await sharp(bytes).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    const original = readFileSync(master.path);
    expect(createHash('sha256').update(original).digest('hex')).toBe(master.sha256);
    expect(original.length).toBe(master.bytes);
    expect((await sharp(original).metadata()).width).toBeGreaterThan(128);
  }
  expect(whetstormPaladinSignatureImageUrl('../holy_light')).toBeNull();
  expect(whetstormPaladinSignatureImageUrl('smite')).toBeNull();
});
