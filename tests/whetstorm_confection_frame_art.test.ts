import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

describe('original confection frame', () => {
  it('has an opaque black center and illuminated rails for screen blending', async () => {
    const art = sharp('public/ui/whetstorm/minigames/confection-frame-original.webp');
    expect(await art.metadata()).toMatchObject({
      format: 'webp',
      width: 1024,
      height: 1024,
      hasAlpha: false,
    });
    const { data, info } = await art.raw().toBuffer({ resolveWithObject: true });
    const pixel = (x: number, y: number) => [
      ...data.subarray((y * info.width + x) * 3, (y * info.width + x) * 3 + 3),
    ];
    expect(Math.max(...pixel(512, 512))).toBeLessThan(3);
    for (const [x, y] of [
      [512, 33],
      [512, 991],
      [33, 512],
      [991, 512],
    ]) {
      expect(Math.max(...pixel(x, y))).toBeGreaterThan(100);
    }
  });

  it('retains the unfilled 22 percent stretched screen-blended border contract', () => {
    const css = readFileSync('src/styles/components.css', 'utf8');
    expect(css).toContain('border-image-slice: 22%;');
    expect(css).toContain('border-image-repeat: stretch;');
    expect(css).toContain('mix-blend-mode: screen;');
  });
});
