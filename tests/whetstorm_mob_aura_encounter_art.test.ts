import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormMobAuraEncounterImageUrl } from '../src/ui/whetstorm_mob_aura_encounter_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const expected: Record<string, string[]> = {
  mob_encounter_stun: ['stomp_stun', 'brood_counter_stun'],
  mob_brood_burn: ['brood_burn_hatchling_burn', 'brood_burn_seared_scales'],
  mob_brood_ward: ['brood_ward'],
  mob_cantor_shield: ['nhalia_cantor_shield'],
};

describe('original mob encounter aura paintings', () => {
  it('routes exact runtime identities and rejects unknown IDs', () => {
    for (const [family, ids] of Object.entries(expected)) {
      for (const id of ids) {
        expect(whetstormMobAuraEncounterImageUrl(id)).toBe(`/ui/whetstorm/auras/${family}.webp`);
      }
    }
    expect(whetstormMobAuraEncounterImageUrl('brood_burn_unknown')).toBeNull();
    expect(whetstormMobAuraEncounterImageUrl('../stomp_stun')).toBeNull();
    expect(whetstormMobAuraEncounterImageUrl('fear_incap')).toBeNull();
  });

  it('pins independent sources, provenance and delivery dimensions', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mob-aura-encounter-generation.json', 'utf8'),
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
