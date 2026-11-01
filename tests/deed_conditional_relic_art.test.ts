import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { conditionalRelicDeedImageUrl } from '../src/ui/conditional_relic_deed_art';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { reliquaryCellArtOpaque } from '../src/ui/reliquary_cell_art';

const ids = ['feat_brightwood_relic', 'col_reliquary_complete'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

it('routes retained conditional relic deeds through game and guide crest resolution', async () => {
  expect(DEEDS[ids[0]]).toMatchObject({ category: 'feat', feat: true, trigger: { kind: 'collectItems', itemIds: ['bramblehide_jerkin', 'monarch_crown_helm'], count: 1 } });
  expect(DEEDS[ids[1]]).toMatchObject({ category: 'collection', feat: true, trigger: { kind: 'manual' } });
  const { records } = JSON.parse(readFileSync('docs/whetstorm/deed-conditional-relic-generation.json', 'utf8'));
  expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
  const masters = new Set<string>();
  const deliveries = new Set<string>();
  for (const record of records) {
    const id = record.id as string;
    const url = `/ui/whetstorm/deeds/${id}.webp`;
    expect(record.source).toBe('OpenAI built-in image generation');
    expect(record.referenceImages).toEqual([]);
    expect(hash(record.master)).toBe(record.masterSha256);
    expect(hash(record.shipping)).toBe(record.shippingSha256);
    expect(await sharp(record.shipping).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128, hasAlpha: false });
    expect(conditionalRelicDeedImageUrl(id)).toBe(url);
    expect(earlyDeedImageUrl(id)).toBe(url);
    const crest = deedCrestId(id, DEEDS[id].category);
    expect(crest).toBe(`deed_${id}`);
    expect(deedCrestHasPaintedArt(crest)).toBe(true);
    expect(deedImageUrl(crest)).toBe(url);
    expect(iconDataUrl('crest', crest)).toBe(url);
    expect(reliquaryCellArtOpaque({ kind: 'crest', crestId: crest })).toBe(true);
    masters.add(record.masterSha256);
    deliveries.add(record.shippingSha256);
  }
  expect(masters.size).toBe(ids.length);
  expect(deliveries.size).toBe(ids.length);
  expect(conditionalRelicDeedImageUrl('__proto__')).toBeNull();
});
