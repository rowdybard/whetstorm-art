import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormModerationAuraImageUrl } from '../src/ui/whetstorm_moderation_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original moderation aura painting', () => {
  it('routes only the exact identity', () => {
    expect(whetstormModerationAuraImageUrl('cheater_mark')).toBe('/ui/whetstorm/auras/cheater_mark.webp');
    expect(whetstormModerationAuraImageUrl('cheater_mark_extra')).toBeNull();
    expect(whetstormModerationAuraImageUrl('../cheater_mark')).toBeNull();
  });

  it('pins its original source and shipping file', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/aura-moderation-generation.json', 'utf8'));
    expect(assets).toHaveLength(1);
    const asset = assets[0];
    expect(asset.reference_images).toEqual([]);
    expect(asset.prompt.length).toBeGreaterThan(50);
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    const source = await sharp(asset.file).metadata();
    expect(source.width).toBeGreaterThanOrEqual(512);
    expect(source.height).toBe(source.width);
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp' });
    expect(whetstormModerationAuraImageUrl(asset.auraId)).toBe(`/${asset.delivery.path.slice(7)}`);
  });
});