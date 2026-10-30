import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

it('routes Farshore and Frostveil gathering and fishing deeds to distinct paintings', async () => {
  const ids = ['chr_farshore_gatherer', 'chr_farshore_first_cast', 'chr_frostveil_gatherer', 'chr_frostveil_first_cast'];
  const provenance = JSON.parse(readFileSync('docs/whetstorm/deed-farshore-frostveil-generation.json', 'utf8'));
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(DEEDS[entry.id]?.category).toBe('chronicle');
    const url = `/ui/whetstorm/deeds/${entry.id}.webp`;
    expect(deedImageUrl(`deed_${entry.id}`)).toBe(url);
    expect(iconDataUrl('crest', `deed_${entry.id}`)).toBe(url);
    for (const file of [entry, entry.master]) {
      const bytes = readFileSync(file.path);
      expect(bytes.length).toBe(file.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
    }
    const bytes = readFileSync(entry.path);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128, hasAlpha: false });
    await sharp(bytes).raw().toBuffer();
    hashes.add(entry.sha256);
  }
  expect(hashes.size).toBe(4);
});
