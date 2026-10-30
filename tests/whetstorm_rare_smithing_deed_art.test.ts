import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { rareSmithingDeedImageUrl } from '../src/ui/rare_smithing_deed_art';

const ids = ['prog_weaponcrafting_rare', 'prog_armorcrafting_rare'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('rare smithing deed paintings', () => {
  it('routes the live crafting deeds to distinct original art with recorded provenance', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-rare-smithing-generation.json', 'utf8'),
    );
    expect(records.map((record: { id: string }) => record.id)).toEqual(ids);
    expect(
      new Set(records.map((record: { shippingSha256: string }) => record.shippingSha256)).size,
    ).toBe(ids.length);
    for (const record of records) {
      expect(DEEDS[record.id]).toMatchObject({
        category: 'progression',
        trigger: { kind: 'visit' },
      });
      const url = `/ui/whetstorm/deeds/${record.id}.webp`;
      const crest = deedCrestId(record.id, DEEDS[record.id].category);
      expect(rareSmithingDeedImageUrl(record.id)).toBe(url);
      expect(earlyDeedImageUrl(record.id)).toBe(url);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
      expect(record.source).toBe('OpenAI built-in image generation');
      expect(record.referenceImages).toEqual([]);
      expect(hash(record.master)).toBe(record.masterSha256);
      expect(hash(record.shipping)).toBe(record.shippingSha256);
      expect(await sharp(record.shipping).metadata()).toMatchObject({
        format: 'webp',
        hasAlpha: false,
        width: 128,
        height: 128,
      });
    }
    expect(rareSmithingDeedImageUrl('unknown')).toBeNull();
  });
});
