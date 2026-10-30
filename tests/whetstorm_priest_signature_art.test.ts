import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { whetstormPriestSignatureImageUrl } from '../src/ui/whetstorm_priest_signature_art';

it('pins original Priest signature paintings and their full-resolution masters', async () => {
  const hashes: Record<string, string> = {
    smite: '0641e91dbe24dc119a89324c22fd10fe372f761cb909e310ba1e7c64bfab4ffd',
    power_word_shield: '09377b75f4d9a29da776dcd3812bc017fcc0fe06d5ebc77a38a81f905b067ab7',
    renew: '8117cba67be79189ee64d650bfba9eab335b3cad9ab9a4050e736fff71303243',
    mind_blast: 'b463dbcce9909e5c41dca19857b4660e6bffe900724b967ea350e72de223e291',
  };
  const provenance = JSON.parse(
    readFileSync('public/ui/whetstorm/abilities/priest-signatures-provenance.json', 'utf8'),
  );
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(Object.keys(hashes));
  for (const entry of provenance.entries) {
    const { id, master } = entry;
    expect(ABILITIES[id]?.class).toBe('priest');
    expect(whetstormPriestSignatureImageUrl(id)).toBe(`/ui/whetstorm/abilities/${id}.webp`);
    const bytes = readFileSync(entry.path);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(hashes[id]);
    expect(entry.sha256).toBe(hashes[id]);
    expect(await sharp(bytes).metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    const original = readFileSync(master.path);
    expect(createHash('sha256').update(original).digest('hex')).toBe(master.sha256);
    expect((await sharp(original).metadata()).width).toBeGreaterThan(128);
  }
  expect(whetstormPriestSignatureImageUrl('../smite')).toBeNull();
  expect(whetstormPriestSignatureImageUrl('unknown_ability')).toBeNull();
});
