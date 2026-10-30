import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const texturePath = 'public/vfx/fel_meteor_impact.png';

describe('original fel meteor impact texture', () => {
  it('is a centered transparent white intensity mask for additive tinting', async () => {
    const { data, info } = await sharp(texturePath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    expect([info.width, info.height, info.channels]).toEqual([512, 512, 4]);
    const pixel = (x: number, y: number) =>
      Array.from(data.subarray((y * 512 + x) * 4, (y * 512 + x) * 4 + 4));
    expect(pixel(0, 0)[3]).toBe(0);
    expect(pixel(256, 256)[3]).toBeGreaterThan(240);
    expect(pixel(256, 128)[3]).toBeGreaterThan(pixel(256, 16)[3]);
    let coloredPixels = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== data[i + 1] || data[i] !== data[i + 2]) coloredPixels++;
    }
    expect(coloredPixels).toBe(0);
  });

  it('keeps the texture deferred and uses it as an additive tinted sprite', () => {
    const source = readFileSync('src/render/warlock_meteor_fx.ts', 'utf8');
    expect(source).toContain("'/vfx/fel_meteor_impact.png'");
    expect(source).toMatch(
      /registerDeferredPreload\(\(\)\s*=>\s*loadTexture\(POWERFUL_FEL_METEOR_TEXTURE_URL/,
    );
    expect(source).toMatch(
      /map: this\.powerfulImpactTexture,[\s\S]*?color: FEL_CORE,[\s\S]*?blending: THREE\.AdditiveBlending/,
    );
  });
});
