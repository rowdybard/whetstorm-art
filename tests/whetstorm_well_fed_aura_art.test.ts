import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormAuraImageUrl } from '../src/ui/whetstorm_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original well-fed aura painting', () => {
  it('maps only the exact aura identity', () => {
    expect(whetstormAuraImageUrl('well_fed')).toBe('/ui/whetstorm/auras/well_fed.webp');
    expect(whetstormAuraImageUrl('../well_fed')).toBeNull();
    expect(whetstormAuraImageUrl('other')).toBeNull();
  });

  it('pins its original source and decodable delivery', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/well-fed-aura-generation.json', 'utf8'),
    );
    expect(assets).toHaveLength(1);
    const asset = assets[0];
    expect(asset.auraId).toBe('well_fed');
    expect(asset.reference_images).toEqual([]);
    expect(asset.prompt.length).toBeGreaterThan(50);
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    const source = await sharp(asset.file).metadata();
    const delivery = await sharp(asset.delivery.path).metadata();
    expect(source.width).toBeGreaterThanOrEqual(512);
    expect(source.height).toBe(source.width);
    expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
  });
});
