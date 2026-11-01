import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { HOARD_STORM_SURGE_AURA_ID } from '../src/sim/rift/hoard_storm_surge';
import { HOARD_TENTACLE_GRASP_AURA_ID } from '../src/sim/rift/hoard_tentacle_grasp';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe } from '../src/ui/icons';
import { hoardStormGraspAuraImageUrl } from '../src/ui/hoard_storm_grasp_aura_art';

const entries = [
  [HOARD_STORM_SURGE_AURA_ID, 'buff_dmg_done'],
  [HOARD_TENTACLE_GRASP_AURA_ID, 'root'],
] as const;
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const resolve = (id: string, kind: string) =>
  resolveAuraIconId({ id, kind }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);

describe('Buried Hoard storm and grasp aura paintings', () => {
  it('preserves exact live IDs through production identity and image routing', () => {
    expect(entries.map(([id]) => id)).toEqual(['hoard_storm_surge', 'hoard_tentacle_grasp']);
    for (const [id, kind] of entries) {
      const expected = `/ui/whetstorm/auras/${id}.webp`;
      expect(hoardStormGraspAuraImageUrl(id)).toBe(expected);
      expect(hasAuraImageIdentity(id)).toBe(true);
      expect(resolve(id, kind)).toBe(id);
      expect(auraImageUrl(resolve(id, kind))).toBe(expected);
    }
    expect(hoardStormGraspAuraImageUrl('hoard_storm_surge_extra')).toBeNull();
    expect(hoardStormGraspAuraImageUrl('../hoard_tentacle_grasp')).toBeNull();
    expect(resolve('unrelated_test_damage_boost', 'buff_dmg_done')).toBe('aura_buff_dmg_done');
    expect(resolve('unrelated_test_snare', 'root')).toBe('aura_root');
  });

  it('pins two independent masters and delivered images', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/hoard-storm-grasp-auras-generation.json', 'utf8'));
    expect(assets.map((asset: { runtimeIds: string[] }) => asset.runtimeIds)).toEqual(entries.map(([id]) => [id]));
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(2);
    expect(new Set(assets.map((asset: { delivery: { sha256: string } }) => asset.delivery.sha256)).size).toBe(2);
    for (const asset of assets) {
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      const source = await sharp(asset.file).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp' });
    }
  });
});
