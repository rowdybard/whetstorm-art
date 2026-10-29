import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormMobAuraBatchImageUrl } from '../src/ui/whetstorm_mob_aura_batch_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original mob aura paintings', () => {
  it('routes the exact live identities and rejects unrelated IDs', () => {
    for (const [id, art] of Object.entries({
      aoe_slow: 'mob_aoe_slow',
      bleed_ridge_stalker: 'mob_bleed',
      bleed_rift_thornback: 'mob_bleed',
      bleed_wildheart_ravager: 'mob_bleed',
      stackpoison_mirefen_broodmother: 'mob_stack_poison',
      stackpoison_rift_boss_venom: 'mob_stack_poison',
      plague_drowned_dead: 'mob_plague',
      plague_fenbridge_infiltrator: 'mob_plague',
      plague_drowned_warlord: 'mob_plague',
    })) {
      expect(whetstormMobAuraBatchImageUrl(id)).toBe(`/ui/whetstorm/auras/${art}.webp`);
    }
    expect(whetstormMobAuraBatchImageUrl('bleed_unknown')).toBeNull();
    expect(whetstormMobAuraBatchImageUrl('../aoe_slow')).toBeNull();
  });

  it('pins four independent original sources and valid deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mob-aura-original-batch-generation.json', 'utf8'),
    );
    expect(assets).toHaveLength(4);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(4);
    for (const asset of assets) {
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
      for (const id of asset.runtimeIds)
        expect(whetstormMobAuraBatchImageUrl(id)).toBe(
          `/${asset.delivery.path.slice('public/'.length)}`,
        );
    }
  });
});
