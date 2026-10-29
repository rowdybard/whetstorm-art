import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resolveMobAuraIconIdentity } from '../src/ui/mob_aura_icon_art';
import { whetstormMobAuraDebuffsImageUrl } from '../src/ui/whetstorm_mob_aura_debuffs_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const expected: Record<string, string[]> = {
  mob_corrode: [
    'corrode_deepfen_murloc',
    'corrode_reliquary_ledger_wraith',
    'corrode_rift_deep_lurker',
  ],
  mob_disarm: ['disarm_ogre_crusher'],
  mob_ensnare: ['ensnare_rift_boss_venom', 'ensnare_rift_venom_weaver', 'ensnare_webwood_spider'],
  mob_frostbite: ['frostbite_rift_rime_elemental', 'frostbite_shardlord_kazzix'],
};

describe('original mob debuff aura paintings', () => {
  it('routes exact identities and rejects arbitrary IDs', () => {
    for (const [family, ids] of Object.entries(expected)) {
      for (const id of ids) {
        expect(resolveMobAuraIconIdentity(id)).toBe(family);
        expect(whetstormMobAuraDebuffsImageUrl(id)).toBe(`/ui/whetstorm/auras/${family}.webp`);
      }
    }
    expect(whetstormMobAuraDebuffsImageUrl('corrode_unknown')).toBeNull();
    expect(whetstormMobAuraDebuffsImageUrl('../disarm_ogre_crusher')).toBeNull();
  });

  it('pins independent sources, provenance, identity reuse and delivery dimensions', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mob-aura-debuffs-generation.json', 'utf8'),
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
