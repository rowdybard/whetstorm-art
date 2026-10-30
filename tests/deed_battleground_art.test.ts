import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { battlegroundDeedImageUrl } from '../src/ui/battleground_deed_art';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const ids = ['pvp_bg_first_capture', 'pvp_bg_first_win', 'pvp_bg_wins_25', 'pvp_bg_captures_100'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('battleground deed paintings', () => {
  it('routes live milestones to distinct recorded original art', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-battleground-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      const id = record.id as string;
      const url = `/ui/whetstorm/deeds/${id}.webp`;
      expect(DEEDS[id].category).toBe('pvp');
      expect(record.shipping).toBe(`public${url}`);
      expect(record.source).toBe('OpenAI built-in image generation');
      expect(record.referenceImages).toEqual([]);
      expect(hash(record.master)).toBe(record.masterSha256);
      expect(hash(record.shipping)).toBe(record.shippingSha256);
      expect(await sharp(record.shipping).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
        hasAlpha: false,
      });
      expect(battlegroundDeedImageUrl(id)).toBe(url);
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(crest).toBe(`deed_${id}`);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
    }
    expect(battlegroundDeedImageUrl('unknown')).toBeNull();
  });
});
