import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormShamanAuraImageUrl } from '../src/ui/whetstorm_shaman_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original shaman aura paintings', () => {
  it('routes exact identities and rejects unrelated IDs', () => {
    for (const id of ['shaman_ancestral_bulwark', 'shaman_gathering_winds', 'shaman_mending_current', 'shaman_thunder_charges']) {
      expect(whetstormShamanAuraImageUrl(id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
    expect(whetstormShamanAuraImageUrl('shaman_gathering_winds_icd')).toBeNull();
    expect(whetstormShamanAuraImageUrl('../shaman_mending_current')).toBeNull();
  });

  it('pins four independent original sources and their shipping files', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/aura-shaman-generation.json', 'utf8'));
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
      expect(whetstormShamanAuraImageUrl(asset.auraId)).toBe(`/${asset.delivery.path.slice(7)}`);
    }
  });
});