import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormCombatEffectAuraImageUrl } from '../src/ui/whetstorm_combat_effect_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original combat effect aura paintings', () => {
  it('routes exact identities and rejects unrelated IDs', () => {
    for (const id of ['boneglass_cut', 'fear_incap', 'marrowpoint_rend', 'water_jet']) {
      expect(whetstormCombatEffectAuraImageUrl(id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
    expect(whetstormCombatEffectAuraImageUrl('water_jet_slow')).toBe('/ui/whetstorm/auras/water_jet.webp');
    expect(whetstormCombatEffectAuraImageUrl('water_jet_unknown')).toBeNull();
    expect(whetstormCombatEffectAuraImageUrl('../fear_incap')).toBeNull();
  });

  it('pins four independent original sources and their shipping files', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/aura-combat-effects-generation.json', 'utf8'));
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
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp' });
      for (const id of asset.runtimeIds) expect(whetstormCombatEffectAuraImageUrl(id)).toBe(`/${asset.delivery.path.slice(7)}`);
    }
  });
});