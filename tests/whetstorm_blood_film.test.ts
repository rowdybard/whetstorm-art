import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const path = 'public/textures/vfx/whetstorm/blood_film.webp';

describe('original Warrior blood film', () => {
  it('provides an opaque sRGB, horizontally continuous red film with dark gaps', async () => {
    const file = await readFile(path);
    const metadata = await sharp(file).metadata();
    expect([
      metadata.width,
      metadata.height,
      metadata.channels,
      metadata.space,
      metadata.hasAlpha,
    ]).toEqual([2048, 1024, 3, 'srgb', false]);
    const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
    let dark = 0,
      red = 0,
      seam = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const i = (y * info.width + x) * 3;
        if (data[i] < 12) dark++;
        if (data[i] > 45 && data[i] > 2 * data[i + 1]) red++;
      }
      for (let c = 0; c < 3; c++) {
        seam += Math.abs(
          data[y * info.width * 3 + c] - data[(y * info.width + info.width - 1) * 3 + c],
        );
      }
    }
    expect(dark / (info.width * info.height)).toBeGreaterThan(0.1);
    expect(red / (info.width * info.height)).toBeGreaterThan(0.2);
    expect(seam / (info.height * 3)).toBeLessThan(3);
  });
});
