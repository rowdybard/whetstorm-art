import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { valeCupSixDeedImageUrl } from '../src/ui/vale_cup_six_deed_art';

const ids = ['chr_vale_cup_debut', 'pvp_vcup_first_match', 'pvp_vcup_first_win', 'pvp_vcup_wins_10', 'pvp_vcup_wins_25', 'pvp_vcup_first_goal'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes retained retired feats to individual original paintings', async () => {
  const { records } = JSON.parse(readFileSync('docs/whetstorm/deed-vale-cup-six-generation.json', 'utf8'));
  expect(records).toHaveLength(ids.length);
  const masters = new Set<string>();
  const deliveries = new Set<string>();
  for (const id of ids) {
    const matching = records.filter((row: { id: string }) => row.id === id);
    expect(matching).toHaveLength(1);
    const record = matching[0];
    expect(DEEDS[id].feat).toBe(true);
    expect(DEEDS[id].desc).toContain('no longer playable');
    const url = `/ui/whetstorm/deeds/${id}.webp`;
    expect(record.status).toContain('no longer newly earnable');
    expect(record.source).toBe('OpenAI built-in image generation');
    expect(record.referenceImages).toEqual([]);
    expect(hash(record.master)).toBe(record.masterSha256);
    expect(hash(record.shipping)).toBe(record.shippingSha256);
    expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128, hasAlpha: false });
    expect(valeCupSixDeedImageUrl(id)).toBe(url);
    const crest = deedCrestId(id, DEEDS[id].category);
    expect(crest).toBe(`deed_${id}`);
    expect(deedCrestHasPaintedArt(crest)).toBe(true);
    expect(deedImageUrl(crest)).toBe(url);
    expect(iconDataUrl('crest', crest)).toBe(url);
    masters.add(record.masterSha256);
    deliveries.add(record.shippingSha256);
  }
  expect(masters.size).toBe(ids.length);
  expect(deliveries.size).toBe(ids.length);
  expect(valeCupSixDeedImageUrl('unknown')).toBeNull();
});
