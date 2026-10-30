import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { iconDataUrl } from '../src/ui/icons';
import { whetstormPriestSignatureImageUrl } from '../src/ui/whetstorm_priest_signature_art';

it('uses independent original paintings for four active Priest abilities', async () => {
  const hashes: Record<string, string> = {
    heal: '2d396cb54975ade73144f621c88acbe5a9c9d0d53ed2368e1cc02e64466866d1',
    flash_heal: 'dbd9ae90e6f3d8b4262f60a6dc54cede44145b4f48ea4b3e0f720d9201f6faee',
    shadow_word_pain: 'd00622abdc07c191971d99d640298f891067020894395367879579c045dd9699',
    mind_flay: 'e19a06dab3758a91bdd8cbd77460858e2e019c21f4d889036c92fb2455e3bfe1',
  };
  const provenance = JSON.parse(readFileSync('public/ui/whetstorm/abilities/priest-core-provenance.json', 'utf8'));
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(Object.keys(hashes));
  for (const entry of provenance.entries) {
    expect(ABILITIES[entry.id]?.class).toBe('priest');
    const url = `/ui/whetstorm/abilities/priest_core_${entry.id}.webp`;
    expect(whetstormPriestSignatureImageUrl(entry.id)).toBe(url);
    expect(iconDataUrl('ability', entry.id)).toBe(url);
    const bytes = readFileSync(entry.path);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(hashes[entry.id]);
    expect(entry.sha256).toBe(hashes[entry.id]);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
    const master = readFileSync(entry.master.path);
    expect(createHash('sha256').update(master).digest('hex')).toBe(entry.master.sha256);
    expect((await sharp(master).metadata()).width).toBeGreaterThan(128);
  }
});
