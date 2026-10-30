import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

it('routes five Crucible encounter deeds to distinct original paintings', async () => {
  const ids = ['dgn_ignivar', 'dgn_ignivar_heroic', 'dgn_varkhul', 'dgn_varkhul_heroic', 'dgn_varkhul_flawless'];
  const provenance = JSON.parse(readFileSync('docs/whetstorm/deed-crucible-five-generation.json', 'utf8'));
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(DEEDS[entry.id]?.category).toBe('dungeon');
    const crest = `deed_${entry.id}`;
    const url = `/ui/whetstorm/deeds/${entry.id}.webp`;
    expect(deedCrestId(entry.id, DEEDS[entry.id].category)).toBe(crest);
    expect(deedImageUrl(crest)).toBe(url);
    expect(iconDataUrl('crest', crest)).toBe(url);
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
  expect(hashes.size).toBe(5);
});
