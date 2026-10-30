import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const ids = [
  'prog_callused_hands',
  'prog_tools_of_the_trade',
  'prog_guildsworn',
  'prog_masterwright',
];
describe('original first-trade deed crests', () => {
  it('routes live progression deeds through the game icon paths', () => {
    for (const id of ids) {
      expect(DEEDS[id]).toMatchObject({ category: 'progression' });
      const url = `/ui/whetstorm/deeds/${id}.webp`;
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(earlyDeedImageUrl(id)).toBe(url);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
    }
    expect(earlyDeedImageUrl('../prog_callused_hands')).toBeNull();
  });
  it('pins independent original sources and decodable deliveries', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-trade-first-generation.json', 'utf8'),
    );
    expect(records.map((r: { id: string }) => r.id)).toEqual(ids);
    expect(new Set(records.map((r: { masterSha256: string }) => r.masterSha256)).size).toBe(4);
    for (const r of records) {
      expect(r.reference_images).toEqual([]);
      for (const [path, digest] of [
        [r.master, r.masterSha256],
        [r.shipping, r.shippingSha256],
      ]) {
        expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(digest);
      }
      expect(await sharp(r.shipping).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
    }
  });
});
