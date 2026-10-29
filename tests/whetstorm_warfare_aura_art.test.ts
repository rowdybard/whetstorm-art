import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormWarfareAuraImageUrl } from '../src/ui/whetstorm_warfare_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original warfare aura paintings', () => {
  it('routes exact identities and rejects unrelated IDs', () => {
    for (const id of ['set_warfare_ashen_step', 'set_warfare_emberward', 'set_warfare_thornguard', 'set_warfare_unbroken_oath']) {
      expect(whetstormWarfareAuraImageUrl(id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
    expect(whetstormWarfareAuraImageUrl('set_warfare_emberward_extra')).toBeNull();
    expect(whetstormWarfareAuraImageUrl('../set_warfare_emberward')).toBeNull();
  });

  it('pins four independent original sources and their shipping files', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/aura-warfare-generation.json', 'utf8'));
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
      expect(whetstormWarfareAuraImageUrl(asset.auraId)).toBe(`/${asset.delivery.path.slice(7)}`);
    }
  });
});