import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { valeCupFiveDeedImageUrl } from '../src/ui/vale_cup_five_deed_art';

const ids = ['pvp_vcup_hat_trick', 'pvp_vcup_golden_goal', 'pvp_vcup_first_save', 'pvp_vcup_clean_sheet', 'pvp_vcup_guild_win'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes the retained Vale Cup feats to distinct recorded original paintings', async () => {
  const { records } = JSON.parse(readFileSync('docs/whetstorm/deed-vale-cup-five-generation.json', 'utf8'));
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  expect(new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size).toBe(ids.length);
  for (const record of records) {
    const id = record.id as string;
    expect(DEEDS[id].category).toBe('pvp');
    expect(DEEDS[id].desc).toContain('no longer');
    expect(record.source).toBe('OpenAI built-in image generation');
    expect(record.referenceImages).toEqual([]);
    expect(hash(record.master)).toBe(record.masterSha256);
    expect(hash(record.shipping)).toBe(record.shippingSha256);
    expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128, hasAlpha: false });
    const url = `/ui/whetstorm/deeds/${id}.webp`;
    expect(record.shipping).toBe(`public${url}`);
    expect(valeCupFiveDeedImageUrl(id)).toBe(url);
    const crest = deedCrestId(id, 'pvp');
    expect(crest).toBe(`deed_${id}`);
    expect(deedImageUrl(crest)).toBe(url);
    expect(iconDataUrl('crest', crest)).toBe(url);
  }
  expect(valeCupFiveDeedImageUrl('unknown')).toBeNull();
});
