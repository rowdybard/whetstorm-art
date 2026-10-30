import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { deedImageUrl } from '../src/ui/icons';
import { socialCommerceDeedImageUrl } from '../src/ui/social_commerce_deed_art';

const ids = ['soc_steady_custom', 'soc_market_magnate', 'soc_by_ravens_wing', 'soc_salvage_50'];

describe('original social and commerce deed crests', () => {
  it('resolves only the four live deeds', () => {
    for (const id of ids) {
      expect(DEEDS[id]).toMatchObject({ category: 'social' });
      expect(socialCommerceDeedImageUrl(id)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
      expect(deedImageUrl(deedCrestId(id, 'social'))).toBe(`/ui/whetstorm/deeds/${id}.webp`);
    }
    expect(socialCommerceDeedImageUrl('../soc_steady_custom')).toBeNull();
    expect(socialCommerceDeedImageUrl('unknown')).toBeNull();
  });
  it('pins independent original sources and decodable deliveries', async () => {
    const { records } = JSON.parse(
      readFileSync('docs/whetstorm/deed-social-commerce-generation.json', 'utf8'),
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
