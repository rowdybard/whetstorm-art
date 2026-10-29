import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resolveMobAuraIconIdentity } from '../src/ui/mob_aura_icon_art';
import { whetstormMobAuraImpairmentsImageUrl } from '../src/ui/whetstorm_mob_aura_impairments_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const expected: Record<string, string[]> = {
  mob_slow_strike: ['slowstrike_mire_prowler'],
  mob_stagger_hit: ['stagger_deeprock_kobold'],
  mob_tongues: ['tongues_nhalia_mourner'],
  mob_wither: ['wither_fen_troll'],
};

describe('original mob impairment aura paintings', () => {
  it('routes exact runtime identities and rejects unknown IDs', () => {
    for (const [family, ids] of Object.entries(expected)) {
      for (const id of ids) {
        expect(resolveMobAuraIconIdentity(id)).toBe(family);
        expect(whetstormMobAuraImpairmentsImageUrl(id)).toBe(`/ui/whetstorm/auras/${family}.webp`);
      }
    }
    expect(whetstormMobAuraImpairmentsImageUrl('tongues_unknown')).toBeNull();
    expect(whetstormMobAuraImpairmentsImageUrl('../wither_fen_troll')).toBeNull();
  });

  it('pins independent sources, provenance and delivery dimensions', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mob-aura-impairments-generation.json', 'utf8'),
    );
    expect(assets).toHaveLength(4);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(4);
    for (const asset of assets) {
      expect(asset.runtimeIds).toEqual(expected[asset.auraId]);
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      const source = await sharp(asset.file).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
    }
  });
});
