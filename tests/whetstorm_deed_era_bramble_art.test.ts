import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS, DEEDS_ERA } from '../src/sim/content/deeds';
import { MAX_LEVEL } from '../src/sim/types';
import { deedCrestId } from '../src/ui/deeds_view';
import { eraBrambleDeedImageUrl } from '../src/ui/era_bramble_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

it('provides distinct paintings for the collection and current era milestone', async () => {
  const ids = ['col_set_bramblehide', 'feat_era_cap'];
  const provenance = JSON.parse(readFileSync('docs/whetstorm/deed-era-bramble-generation.json', 'utf8'));
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  expect(DEEDS_ERA).toBe('first_era');
  expect(MAX_LEVEL).toBe(20);
  expect(DEEDS.feat_era_cap.trigger).toEqual({ kind: 'flag', flag: 'firstEraCap' });
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(DEEDS[entry.id]).toBeDefined();
    const url = `/ui/whetstorm/deeds/${entry.id}.webp`;
    const crest = `deed_${entry.id}`;
    expect(eraBrambleDeedImageUrl(entry.id)).toBe(url);
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
  expect(hashes.size).toBe(2);
  expect(eraBrambleDeedImageUrl('../feat_era_cap')).toBeNull();
});
