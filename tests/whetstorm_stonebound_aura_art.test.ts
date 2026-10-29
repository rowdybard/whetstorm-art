import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormStoneboundAuraImageUrl } from '../src/ui/whetstorm_stonebound_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original stonebound aura paintings', () => {
  it('routes exact identities and rejects unrelated IDs', () => {
    for (const id of ['shaman_stonebound_armor', 'shaman_stonebound_stamina', 'shaman_stonebound_dr']) {
      expect(whetstormStoneboundAuraImageUrl(id)).toBe('/ui/whetstorm/auras/shaman_stonebound.webp');
    }
    for (const id of ['shaman_stonebound_unleash_guard', 'shaman_stonebound_ward_smooth', 'shaman_warspirit_cadence']) {
      expect(whetstormStoneboundAuraImageUrl(id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
    expect(whetstormStoneboundAuraImageUrl('shaman_stonebound_unknown')).toBeNull();
    expect(whetstormStoneboundAuraImageUrl('../shaman_stonebound_dr')).toBeNull();
  });

  it('pins four independent original sources and their shipping files', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/aura-stonebound-generation.json', 'utf8'));
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
      for (const id of asset.runtimeIds) expect(whetstormStoneboundAuraImageUrl(id)).toBe(`/${asset.delivery.path.slice(7)}`);
    }
  });
});