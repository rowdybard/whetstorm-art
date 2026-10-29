import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resolveMobAuraIconIdentity } from '../src/ui/mob_aura_icon_art';
import { whetstormMobAuraDefenseImageUrl } from '../src/ui/whetstorm_mob_aura_defense_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const expected: Record<string, string[]> = {
  mob_stoneskin: [
    'stoneskin_ancient_guardian',
    'stoneskin_marrowlord_varkas',
    'stoneskin_old_marrowshell',
    'stoneskin_rift_boss_arcane',
    'stoneskin_rift_boss_frost',
    'stoneskin_sump_troll_devourer',
    'stoneskin_thunzharr_waking_peak',
  ],
  mob_stun_on_hit: ['stun_mogger_lackey', 'stun_rift_stone_ogre'],
  mob_warcry: ['warcry_deepfen_murloc', 'warcry_wildheart_beastmaster'],
  mob_ward_allies: [
    'ward_grave_silt_bulwark',
    'ward_mogger',
    'ward_treant_elder',
    'ward_wildheart_beastmaster',
  ],
};

describe('original mob defense aura paintings', () => {
  it('routes exact runtime identities and rejects unknown IDs', () => {
    for (const [family, ids] of Object.entries(expected)) {
      for (const id of ids) {
        expect(resolveMobAuraIconIdentity(id)).toBe(family);
        expect(whetstormMobAuraDefenseImageUrl(id)).toBe(`/ui/whetstorm/auras/${family}.webp`);
      }
    }
    expect(whetstormMobAuraDefenseImageUrl('stoneskin_unknown')).toBeNull();
    expect(whetstormMobAuraDefenseImageUrl('../ward_mogger')).toBeNull();
  });

  it('pins independent sources, provenance and delivery dimensions', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mob-aura-defense-generation.json', 'utf8'),
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
