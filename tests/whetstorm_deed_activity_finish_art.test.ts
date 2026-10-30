import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

it('routes four active deeds to distinct original paintings', async () => {
  const ids = ['exp_arcane_calligraphy_gold', 'exp_last_barricade', 'exp_borrowed_face', 'cmb_coinsack_caught'];
  const provenance = JSON.parse(readFileSync('docs/whetstorm/deed-activity-finish-generation.json', 'utf8'));
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(DEEDS[entry.id]).toBeDefined();
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
