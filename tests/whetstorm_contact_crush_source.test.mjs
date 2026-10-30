import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { CELL, SIZE, encodeCrush } from '../scripts/assets/vfx_production/whetstorm_contact_crush.mjs';

describe('original Whetstorm crush contact source', () => {
  it('rebuilds a chronological straight-alpha sheet with transparent gutters and a fading burst', async () => {
    const source = await readFile('docs/design/whetstorm-art/vfx/contact_crush_source.png');
    expect(source.equals(await encodeCrush())).toBe(true);
    const { data, info } = await sharp(source).raw().toBuffer({ resolveWithObject: true });
    expect([info.width, info.height, info.channels]).toEqual([2048, 2048, 4]);
    const sums = [];
    const colors = new Set();
    for (let f = 0; f < 64; f++) {
      let sum = 0;
      let gutter = 0;
      for (let y = 0; y < CELL; y++) for (let x = 0; x < CELL; x++) {
        const i = ((Math.floor(f / 8) * CELL + y) * SIZE + (f % 8) * CELL + x) * 4;
        const a = data[i + 3];
        if (x < 16 || x >= 240 || y < 16 || y >= 240) gutter += a;
        if (a > 32) colors.add(data[i]);
        sum += a;
      }
      expect(gutter).toBe(0);
      sums.push(sum);
    }
    expect(sums[0]).toBe(0);
    expect(sums[63]).toBe(0);
    expect(sums.slice(1, 63).every((v) => v > 0)).toBe(true);
    expect(sums[15]).toBeGreaterThan(sums[2]);
    expect(sums[15]).toBeGreaterThan(sums[50]);
    expect(colors.size).toBeGreaterThan(40);
  }, 30000);
});

