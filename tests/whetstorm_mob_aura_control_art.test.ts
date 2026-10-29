import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resolveMobAuraIconIdentity } from '../src/ui/mob_aura_icon_art';
import { whetstormMobAuraControlImageUrl } from '../src/ui/whetstorm_mob_aura_control_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const expected: Record<string, string[]> = {
  mob_lockout: ['lockout_threnos_first_voice', 'lockout_wyrmcult_zealot'],
  mob_chill_on_hit: [
    'mirefen_widowling_chill',
    'rift_frost_revenant_chill',
    'stormcrag_elemental_chill',
  ],
  mob_charge_stun: ['mob_charge_stun'],
  mob_demoralize: ['mob_demoralize'],
};

describe('original mob control aura paintings', () => {
  it('routes exact identities to their family and rejects arbitrary IDs', () => {
    for (const [family, ids] of Object.entries(expected)) {
      for (const id of ids) {
        expect(resolveMobAuraIconIdentity(id)).toBe(family);
        expect(whetstormMobAuraControlImageUrl(id)).toBe(`/ui/whetstorm/auras/${family}.webp`);
      }
    }
    expect(whetstormMobAuraControlImageUrl('lockout_unknown')).toBeNull();
    expect(whetstormMobAuraControlImageUrl('../mob_demoralize')).toBeNull();
  });

  it('pins independent source and delivery hashes and dimensions', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/mob-aura-control-generation.json', 'utf8'),
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
