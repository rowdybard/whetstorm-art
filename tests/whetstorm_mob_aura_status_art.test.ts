import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resolveMobAuraIconIdentity } from '../src/ui/mob_aura_icon_art';
import { whetstormMobAuraStatusImageUrl } from '../src/ui/whetstorm_mob_aura_status_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const identities: Record<string, string> = {
  arcaneRot_deacon_voss: 'mob_arcane_rot',
  arcaneRot_rift_void_acolyte: 'mob_arcane_rot',
  blind_vale_bandit: 'mob_blind',
  cinder_ironvein_sapper: 'mob_cinder',
  cinder_rift_boss_ember: 'mob_cinder',
  cinder_rift_ember_fiend: 'mob_cinder',
  concuss_brakka_wallbreaker: 'mob_concuss',
  concuss_rift_boss_storm: 'mob_concuss',
  concuss_rift_storm_caller: 'mob_concuss',
  concuss_thornpeak_ogre: 'mob_concuss',
};

describe('original mob status aura paintings', () => {
  it('routes exact audited identities and rejects unknown IDs', () => {
    for (const [id, family] of Object.entries(identities)) {
      expect(resolveMobAuraIconIdentity(id)).toBe(family);
      expect(whetstormMobAuraStatusImageUrl(id)).toBe(`/ui/whetstorm/auras/${family}.webp`);
    }
    expect(whetstormMobAuraStatusImageUrl('concuss_unknown')).toBeNull();
    expect(whetstormMobAuraStatusImageUrl('../blind_vale_bandit')).toBeNull();
  });

  it('pins independent sources and runtime deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mob-aura-status-generation.json', 'utf8'),
    );
    expect(assets).toHaveLength(4);
    expect(new Set(assets.map((a: { sha256: string }) => a.sha256)).size).toBe(4);
    for (const asset of assets) {
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      for (const id of asset.runtimeIds)
        expect(whetstormMobAuraStatusImageUrl(id)).toBe(`/${asset.delivery.path.slice(7)}`);
    }
  });
});
