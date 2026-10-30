import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { earlySocialDeedImageUrl } from '../src/ui/early_social_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { reliquaryCellArtOpaque } from '../src/ui/reliquary_cell_art';

const ids = ['soc_first_party', 'soc_first_trade', 'soc_first_salvage', 'soc_meet_bursar'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('early social deed paintings', () => {
  it('routes live deeds through the game and guide lookup to distinct recorded art', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-early-social-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id]).toMatchObject({ category: 'social' });
      const url = `/ui/whetstorm/deeds/${record.id}.webp`;
      const crest = deedCrestId(record.id, DEEDS[record.id].category);
      expect(record.shipping).toBe(`public${url}`);
      expect(earlySocialDeedImageUrl(record.id)).toBe(url);
      expect(earlyDeedImageUrl(record.id)).toBe(url);
      expect(crest).toBe(`deed_${record.id}`);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
      expect(reliquaryCellArtOpaque({ kind: 'crest', crestId: crest })).toBe(true);
      expect(record.source).toBe('OpenAI built-in image generation');
      expect(record.referenceImages).toEqual([]);
      expect(record.prompt.length).toBeGreaterThan(50);
      expect(hash(record.master)).toBe(record.masterSha256);
      expect(hash(record.shipping)).toBe(record.shippingSha256);
      expect(await sharp(record.shipping).metadata()).toMatchObject({
        format: 'webp',
        hasAlpha: false,
        width: 128,
        height: 128,
      });
    }
    expect(earlySocialDeedImageUrl('unknown')).toBeNull();
  });
});
