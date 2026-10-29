import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormElementalProcAuraImageUrl } from '../src/ui/whetstorm_elemental_proc_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original elemental proc aura paintings', () => {
  it('routes exact identities and rejects unrelated IDs', () => {
    for (const id of ['elemental_convergence', 'convergence_cd', 'convergence_mark']) {
      expect(whetstormElementalProcAuraImageUrl(id)).toBe('/ui/whetstorm/auras/elemental_convergence.webp');
    }
    for (const id of ['shaman_stormcast', 'shaman_stormcast_cheap']) {
      expect(whetstormElementalProcAuraImageUrl(id)).toBe('/ui/whetstorm/auras/shaman_stormcast.webp');
    }
    expect(whetstormElementalProcAuraImageUrl('shaman_wayfarer_grace')).toBe('/ui/whetstorm/auras/shaman_wayfarer_grace.webp');
    expect(whetstormElementalProcAuraImageUrl('shaman_wayfarer_grace_icd')).toBeNull();
    expect(whetstormElementalProcAuraImageUrl('../convergence_cd')).toBeNull();
  });

  it('pins three independent original sources and their shipping files', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/aura-elemental-proc-generation.json', 'utf8'));
    expect(assets).toHaveLength(3);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(3);
    for (const asset of assets) {
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      const source = await sharp(asset.file).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp' });
      for (const id of asset.runtimeIds) expect(whetstormElementalProcAuraImageUrl(id)).toBe(`/${asset.delivery.path.slice(7)}`);
    }
  });
});