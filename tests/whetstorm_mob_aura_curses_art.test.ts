import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resolveMobAuraIconIdentity } from '../src/ui/mob_aura_icon_art';
import { whetstormMobAuraCursesImageUrl } from '../src/ui/whetstorm_mob_aura_curses_art';

const identities: Record<string, string> = {
  expose_varkas_boneguard: 'mob_expose',
  heal_absorb_gravecaller_summoner: 'mob_heal_absorb',
  heal_absorb_rift_boss_necro: 'mob_heal_absorb',
  hex_gravecaller_cultist: 'mob_hex',
  hex_mudfin_murloc: 'mob_polymorph_hex',
};
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original mob curse aura paintings', () => {
  it('routes exact runtime identities and rejects unknown IDs', () => {
    for (const [id, family] of Object.entries(identities)) {
      expect(resolveMobAuraIconIdentity(id)).toBe(family);
      expect(whetstormMobAuraCursesImageUrl(id)).toBe(`/ui/whetstorm/auras/${family}.webp`);
    }
    expect(whetstormMobAuraCursesImageUrl('hex_unknown')).toBeNull();
    expect(whetstormMobAuraCursesImageUrl('../hex_mudfin_murloc')).toBeNull();
  });

  it('pins independent sources, family membership and runtime deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mob-aura-curses-generation.json', 'utf8'),
    );
    expect(assets).toHaveLength(4);
    expect(new Set(assets.map((a: { sha256: string }) => a.sha256)).size).toBe(4);
    expect(assets.flatMap((a: { runtimeIds: string[] }) => a.runtimeIds).sort()).toEqual(
      Object.keys(identities).sort(),
    );
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
      for (const id of asset.runtimeIds) {
        expect(identities[id]).toBe(asset.auraId);
        expect(whetstormMobAuraCursesImageUrl(id)).toBe(`/${asset.delivery.path.slice(7)}`);
      }
    }
  });
});
