import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { pvpHonorCardsDeedImageUrl } from '../src/ui/pvp_honor_cards_deed_art';

it('provides distinct original paintings for live honor and Card Duel milestones', async () => {
  const ids = ['pvp_honor_sergeant', 'pvp_honor_knight_lieutenant', 'pvp_honor_field_marshal', 'pvp_card_duel_first_win'];
  const provenance = JSON.parse(readFileSync('docs/whetstorm/deed-pvp-honor-cards-generation.json', 'utf8'));
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
  expect(hashes.size).toBe(4);
  expect(pvpHonorCardsDeedImageUrl('../pvp_honor_sergeant')).toBeNull();
});
