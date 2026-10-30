import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormHunterCooldownAuraImageUrl } from '../src/ui/whetstorm_hunter_cooldown_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original hunter cooldown aura paintings', () => {
  it('routes exact identities and rejects unrelated IDs', () => {
    for (const id of ['hunter_enduring_courser_icd', 'hunter_predators_pace_icd']) {
      expect(whetstormHunterCooldownAuraImageUrl(id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
    expect(whetstormHunterCooldownAuraImageUrl('hunter_predators_pace')).toBeNull();
    expect(whetstormHunterCooldownAuraImageUrl('../hunter_enduring_courser_icd')).toBeNull();
  });

  it('pins two independent original sources and their shipping files', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/aura-hunter-cooldown-generation.json', 'utf8'));
    expect(assets).toHaveLength(2);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(2);
    for (const asset of assets) {
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      const source = await sharp(asset.file).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp' });
      expect(whetstormHunterCooldownAuraImageUrl(asset.auraId)).toBe(`/${asset.delivery.path.slice(7)}`);
    }
  });
});