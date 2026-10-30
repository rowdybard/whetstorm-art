import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  VARKHUL_CINDER_ORBS_AURA_ID,
  VARKHUL_MAKERS_BRAND_AURA_ID,
  VARKHUL_MASTERS_ASSEMBLY_AURA_ID,
  VARKHUL_RED_HOT_METAL_AURA_ID,
} from '../src/sim/encounters/varkhul';
import { whetstormVarkhulAuraImageUrl } from '../src/ui/whetstorm_varkhul_aura_art';

const ids = [
  VARKHUL_MAKERS_BRAND_AURA_ID,
  VARKHUL_CINDER_ORBS_AURA_ID,
  VARKHUL_RED_HOT_METAL_AURA_ID,
  VARKHUL_MASTERS_ASSEMBLY_AURA_ID,
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Varkhul aura paintings', () => {
  it('routes live exact identities and rejects arbitrary ids', () => {
    for (const id of ids)
      expect(whetstormVarkhulAuraImageUrl(id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    expect(whetstormVarkhulAuraImageUrl('varkhul_red_hot_metal_absorb')).toBeNull();
    expect(whetstormVarkhulAuraImageUrl('../varkhul_makers_brand')).toBeNull();
  });
  it('pins independent masters, provenance, and delivery dimensions', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/varkhul-aura-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { auraId: string }) => asset.auraId)).toEqual(ids);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(ids.length);
    for (const asset of assets) {
      expect(asset.runtimeIds).toEqual([asset.auraId]);
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
