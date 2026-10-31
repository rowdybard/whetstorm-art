import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { pvpHonorCardsDeedImageUrl } from '../src/ui/pvp_honor_cards_deed_art';

it('routes all five World PvP time deeds to distinct paintings', async () => {
  const ids = ['pvp_flag_1h', 'pvp_flag_3h', 'pvp_flag_6h', 'pvp_flag_24h', 'pvp_flag_168h'];
  const provenance = JSON.parse(readFileSync('docs/whetstorm/deed-pvp-flag-time-generation.json', 'utf8'));
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(DEEDS[entry.id]?.category).toBe('pvp');
    const url = `/ui/whetstorm/deeds/${entry.id}.webp`;
    const crest = `deed_${entry.id}`;
    expect(pvpHonorCardsDeedImageUrl(entry.id)).toBe(url);
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
