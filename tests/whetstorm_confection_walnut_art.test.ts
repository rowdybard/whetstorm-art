import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/minigames/confection-walnut-original-provenance.json', 'utf8'),
);

describe('original confection walnut texture', () => {
  it('pins the original master, generator, and runtime asset', async () => {
    for (const asset of [provenance.runtime, provenance.master, provenance.generator]) {
      const bytes = readFileSync(asset.path);
      expect(bytes.length).toBe(asset.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(asset.sha256);
    }
    expect(await sharp(provenance.master.path).metadata()).toMatchObject({
      width: 1024,
      height: 1024,
    });
    expect(await sharp(provenance.runtime.path).metadata()).toMatchObject({
      width: 512,
      height: 512,
      format: 'webp',
    });
  });

  it.each([200, 290, 320, 360])('has no discontinuous tile seam at %ipx', async (size) => {
    const { data, info } = await sharp(provenance.runtime.path)
      .resize(size, size)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const difference = (x1: number, y1: number, x2: number, y2: number) => {
      let sum = 0;
      for (let c = 0; c < info.channels; c++)
        sum += Math.abs(
          data[(y1 * size + x1) * info.channels + c] - data[(y2 * size + x2) * info.channels + c],
        );
      return sum / info.channels;
    };
    let horizontal = 0;
    let vertical = 0;
    let internalHorizontal = 0;
    let internalVertical = 0;
    for (let i = 0; i < size; i++) {
      horizontal += difference(0, i, size - 1, i);
      vertical += difference(i, 0, i, size - 1);
      for (let j = 0; j < size - 1; j++) {
        internalHorizontal += difference(j, i, j + 1, i);
        internalVertical += difference(i, j, i, j + 1);
      }
    }
    expect(horizontal / size).toBeLessThan(internalHorizontal / (size * (size - 1)) + 2);
    expect(vertical / size).toBeLessThan(internalVertical / (size * (size - 1)) + 2);
  });
});
